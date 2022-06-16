import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import axios from '../api/axios';

const ListManager = (props) => {
    const navigate = useNavigate();
    const { auth } = useAuth();

    const listName = props.listName
    const [list, setList] = useState([])

    async function fetchData(endpoint) {
        try {
            var response = await axios.get(`${endpoint}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'access_token': auth.accessToken
                    }
                }
            );

            setList(response.data)
            console.log(list)
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

    function goDetails(id){
        navigate(`/${listName}/${id}`);
    }

    function goNew() {
        navigate(`/${listName}/nuevo/editor`);
    }

    useEffect(() => {
        fetchData(listName)
    }, [])// eslint-disable-line react-hooks/exhaustive-deps

    const renderList = list.map(item => (
        <div className="elementList" key={item._id} onClick={() => goDetails(item._id)}>
            { listName === 'Usuarios' ? <h4> { item.displayName } </h4> : <h4> { item.nombre } </h4>}
            { console.log(item) }
        </div>
    ))

    return (
        <section>
            <h1>{listName}</h1>
            <div className="wrapperList">
                { renderList }
            </div>

            {
                 auth?.roles?.find(role => 'admin' === role) ? <button onClick={goNew}>Agregar</button> : <></>
            }
        </section>
    )
}

export default ListManager