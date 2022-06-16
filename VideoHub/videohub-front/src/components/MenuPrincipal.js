import { useNavigate } from "react-router-dom"
import { FaWpforms, FaPhotoVideo } from 'react-icons/fa'

const MenuPrincipal = () => {
    const navigate = useNavigate();

    const goTo = (route) => {
        navigate(route)
    }

    return (
        <section>
            <h1>Menú</h1>
            <br />
            <div className="wrapper">
                <div className="element" onClick={() => goTo('paquetes')}>
                    <FaWpforms size={'5em'} />
                    <p>Paquetes</p>
                </div>
                <div className="element" onClick={() => goTo('eventos')}>
                    <FaPhotoVideo size={'5em'} />
                    <p>Eventos</p>
                </div>
            </div>
        </section>
    )
}

export default MenuPrincipal