import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react'
import useAuth from '../hooks/useAuth';
import axios from '../api/axios';

const EventosEdit = () => {
    const { auth } = useAuth();
    const { id } = useParams();
    const navigate = useNavigate();

    const [nombre, setNombre] = useState('')
    const [video, setVideo] = useState('')
    const [comentarios, setComentarios] = useState([])

    const [file, setFile] = useState()

    async function fetchData(endpoint) {
        try {
            var response = await axios.get(endpoint,
                {
                    headers: { 'Content-Type': 'application/json' }
                }
            );

            setNombre(response.data.nombre)
            setVideo(response.data.video)
            setComentarios(response.data.comentarios)

        } catch (err) {
            if (!err?.response) {
                console.log('No Server Response');
            } else if (err.response?.status === 400) {
                console.log('Missing data');
            } else if (err.response?.status === 401) {
                console.log('Unauthorized');
            } else {
                console.log('Failed\n', err);
            }
        }
    }

    async function save(e) {
        e.preventDefault()

        var evento = {
            nombre,
            video: '',
            comentarios
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('fileName', file.name);
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
            },
        };
        axios.post('upload', formData, config).then((response) => {
            return response.data.filename
        })
            .then(res => {
                evento.video = res
                if (id === 'nuevo') {
                    axios.post('eventos/', JSON.stringify(evento),
                        {
                            headers: {
                                'Content-Type': 'application/json',
                                'access_token': auth.accessToken
                            }
                        }
                    )
                }
                else {
                   axios.post(`eventos/${id}`, JSON.stringify(evento),
                        {
                            headers: {
                                'Content-Type': 'application/json',
                                'access_token': auth.accessToken
                            }
                        }
                    )
                }
            })
            .then(navigate(-1))
            .catch((err) => {
                if (!err?.response) {
                    console.log('No Server Response');
                } else if (err.response?.status === 400) {
                    console.log('Missing data');
                } else if (err.response?.status === 401) {
                    console.log('Unauthorized');
                } else {
                    console.log('Failed\n', err);
                    console.log(err.response)
                }
            });
        // try {
        //     if (id === 'nuevo') {
        //         var response = await axios.post('eventos/', JSON.stringify(evento),
        //             {
        //                 headers: {
        //                     'Content-Type': 'application/json',
        //                     'access_token': auth.accessToken
        //                 }
        //             }
        //         )
        //     }
        //     else {
        //         var response = await axios.post(`eventos/${id}`, JSON.stringify(evento),
        //             {
        //                 headers: {
        //                     'Content-Type': 'application/json',
        //                     'access_token': auth.accessToken
        //                 }
        //             }
        //         )
        //     }

        //     navigate(-1)

        // } catch (err) {
        //     if (!err?.response) {
        //         console.log('No Server Response');
        //     } else if (err.response?.status === 400) {
        //         console.log('Missing data');
        //     } else if (err.response?.status === 401) {
        //         console.log('Unauthorized');
        //     } else {
        //         console.log('Failed\n', err);
        //         console.log(err.response)
        //     }
        // }

    }

    async function sendFile() {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('fileName', file.name);
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
            },
        };
        return axios.post('upload', formData, config)
    }

    const goBack = (e) => {
        e.preventDefault()
        navigate(-1)
    };

    function handleChange(event) {
        setFile(event.target.files[0])
    }

    return (
        <section>
            <h1>Detalles del evento</h1><br />
            <h4>Nombre:</h4>
            <input type="text" autoComplete="off" onChange={(e) => setNombre(e.target.value)} value={nombre || ''} required />
            <h4>Video</h4>
            <input type="file" onChange={handleChange} />

            {/* <button onClick={onFileUpload}>Subir video</button> */}
            <br />
            <button onClick={save}>Guardar</button>
            <button onClick={goBack}>Cancelar</button>
        </section>
    )
}

export default EventosEdit