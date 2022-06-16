import { useState, useEffect } from 'react'
import useAuth from '../hooks/useAuth';
import axios from '../api/axios';

const Chat = (props) => {
    const id = props.id
    const { auth } = useAuth();

    const [comentarios, setComentarios] = useState([])
    const [comentario, setComentario] = useState('')

    async function fetchData(endpoint) {
        try {
            var response = await axios.get(`${endpoint}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
            );

            setComentarios(response.data)

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

    async function send() {
        try {
            console.log(auth.accessToken)
            var response = await axios.post(`eventos/${id}/comment`, JSON.stringify({
                persona: auth.displayName,
                mensaje: comentario
            }),
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'access_token': auth.accessToken
                    }
                }
            );

            fetchData(`eventos/${id}/comment`)

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

    useEffect(() => {
        fetchData(`eventos/${id}/comment`)
    }, [])// eslint-disable-line react-hooks/exhaustive-deps

    const renderComments = comentarios?.map(item => (
        <div className="chatGlobes" key={item.mensaje} >
            <h5> {item.persona}: </h5>
            <h6> {item.mensaje} </h6>
        </div>
    ))

    return (
        <div className="elementChatCaja">
            <div className='elementChatBox'>
                {renderComments}
            </div>
            {
                auth.email ?
                    <>
                        <div className="element elementButtons">
                            <input type="text" className="tbox" autoComplete="off" onChange={(e) => setComentario(e.target.value)} value={comentario || ''} required />
                            <button className="btn" onClick={send}>Enviar</button>
                        </div>
                    </> : <></>
            }
        </div>
    )
}

export default Chat