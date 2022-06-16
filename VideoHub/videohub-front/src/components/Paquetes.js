import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react'
import useAuth from '../hooks/useAuth';
import axios from '../api/axios';

const Paquetes = () => {
    const navigate = useNavigate();
    const { auth } = useAuth();
    const { id } = useParams()

    const [paquetes, setPaquete] = useState({})

    async function fetchData(endpoint) {
        try {
            var response = await axios.get(`${endpoint}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
            );
            setPaquete(response.data)
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
            var response = await axios.delete(`paquetes/${id}`,
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
        fetchData(`paquetes/${id}`)
    }, [])// eslint-disable-line react-hooks/exhaustive-deps

    return (
        <section>
            <h1>Detalles del paquete</h1><br />
            <h4>Nombre:</h4>
            {paquetes && <p>{paquetes.nombre}</p>}
            <h4>descripción:</h4>
            {paquetes && <p>{paquetes.descripcion}</p>}
            <h4>Precio:</h4>
            {paquetes && <p>{paquetes.precio}</p>}

            {
                auth?.roles?.find(role => 'admin' === role) ?
                    <>
                        <button onClick={goEdit}>Editar</button>
                        <button onClick={goDelete}>Eliminar</button>
                    </> : <></>
            }
        </section>
    )
}

export default Paquetes