import { Link } from "react-router-dom"

const Missing = () => {
    return (
        <article style={{ padding: "100px" }}>
            <h1>Oops!</h1><br></br>
            <p>Página no encontrada</p>
            <div className="flexGrow">
                <Link to="/">Volver al inicio</Link>
            </div>
        </article>
    )
}

export default Missing
