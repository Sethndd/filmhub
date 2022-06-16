import { useNavigate } from "react-router-dom"
import { FaUsers, FaWpforms, FaPhotoVideo } from 'react-icons/fa'

const Admin = () => {
    const navigate = useNavigate();

    const goTo = (route) => {
        navigate(route)
    }

    return (
        <section>
            <h1>Gestionar</h1>
            <br />
            <div className="wrapper">
                <div className="element" onClick={() => goTo('/paquetes')}>
                    <FaWpforms size={'5em'} />
                    <p>Paquetes</p>
                </div>
                <div className="element" onClick={() => goTo('/eventos')}>
                    <FaPhotoVideo size={'5em'} />
                    <p>Eventos</p>
                </div>
                <div className="element" onClick={() => goTo('/usuarios')}>
                    <FaUsers size={'5em'} />
                    <p>Usuarios</p>
                </div>
            </div>
        </section>
    )
}

export default Admin
