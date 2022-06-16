import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react'
import useAuth from '../hooks/useAuth';
import axios from '../api/axios';
import Chat from "./Chat";

const Eventos = () => {
    const navigate = useNavigate();
    const { auth } = useAuth();
    const { id } = useParams()

    const [eventos, setEventos] = useState({})

    async function fetchData(endpoint) {
        try {
            var response = await axios.get(`${endpoint}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
            );
            setEventos(response.data)
        } catch (err) {
            if (!err?.response) {
                console.log('No Server Response');
            } else if (err.response?.status === 400) {
                console.log('Missing data');
            } else if (err.response?.status === 401) {
                console.log('Unauthorized');
            } else {
                console.log('Login Failed\n', err);
            }
        }
    }

    async function goDelete() {
        try {
            var response = await axios.delete(`eventos/${id}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'access_token': auth.accessToken
                    }
                }
            )

            navigate(-1)

        } catch (err) {
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
        }
    }

    function goEdit() {
        navigate('editor');
    }

    useEffect(() => {
        fetchData(`eventos/${id}`)
    }, [])// eslint-disable-line react-hooks/exhaustive-deps


    return (
        <div className="sectionBigger">
            <h1>Detalles del evento</h1><br />
            <div className="wrapperEvento">
                <div className="element elementTitle">
                    {eventos && <h4>{eventos.nombre}</h4>}
                </div>
                <div className="element elementBig">
                    <video id="video-player" src={`http://localhost:3001/files/${eventos.video}`} controls></video>
                </div>
                <div className="element elementChat">
                    <Chat id = {id}/>
                </div>
            </div>

            {
                auth?.roles?.find(role => 'admin' === role) ?
                    <>
                        <button onClick={goEdit}>Editar</button>
                        <button onClick={goDelete}>Eliminar</button>
                    </> : <></>
            }
        </div>
    )
}

export default Eventos