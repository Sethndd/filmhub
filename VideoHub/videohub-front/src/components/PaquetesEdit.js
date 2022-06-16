import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react'
import useAuth from '../hooks/useAuth';
import axios from '../api/axios';

const PaquetesEdit = () => {
    const { auth } = useAuth();
    const { id } = useParams();
    const navigate = useNavigate();

    const [nombre, setNombre] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [precio, setPrecio] = useState(0)

    async function fetchData(endpoint) {
        try {
            var response = await axios.get(endpoint,
                {
                    headers: { 'Content-Type': 'application/json' }
                }
            );

            setNombre(response.data.nombre)
            setDescripcion(response.data.descripcion)
            setPrecio(response.data.precio)
                
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

    async function save(e){
        e.preventDefault()
        var paquete = {
            nombre,
            descripcion,
            precio : parseInt(precio),
            image: 'default'
            }
        
        try {
            if(id === 'nuevo'){
                var response = await axios.post('paquetes/', JSON.stringify(paquete),
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'access_token': auth.accessToken
                        }
                    }
                )
            }
            else{
                var response = await axios.post(`paquetes/${id}`, JSON.stringify(paquete),
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'access_token': auth.accessToken
                        }
                    }
                )
            }

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
    
    const goBack = (e) => {
        e.preventDefault()
        navigate(-1)
    };

    useEffect(() => {
        if(id !== 'nuevo'){
            fetchData(`paquetes/${id}`)
        }
    }, [])// eslint-disable-line react-hooks/exhaustive-deps

    return (
        <section>
            <h1>Detalles del paquete</h1><br/>
            <form>
                <h4>Nombre:</h4>
                <input type="text" autoComplete="off" onChange={(e) => setNombre(e.target.value)} value={nombre || ''} required />
                <h4>descripción:</h4>
                <textarea type="text" autoComplete="off" onChange={(e) => setDescripcion(e.target.value)} value={descripcion || ''} required />
                <h4>Precio:</h4>
                <input type="text" autoComplete="off" onChange={(e) => setPrecio(e.target.value)} value={precio || ''} required />
                
                <button onClick={ save}>Guardar</button>
                <button onClick={ goBack }>Cancelar</button>
            </form>
        </section>
    )
}

export default PaquetesEdit