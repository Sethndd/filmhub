import { useNavigate } from "react-router-dom"
import { useContext } from "react";
import { FaSignInAlt, FaSignOutAlt, FaHome, FaArrowLeft } from "react-icons/fa";
import AuthContext from "../context/AuthProvider";
import useAuth from "../hooks/useAuth";

const Navbar = () => {
    const { setAuth } = useContext(AuthContext);
    const { auth } = useAuth();
    const navigate = useNavigate();
    
    const logout = async () => {
        setAuth({});
        navigate('/login');

    }
    const login = () => {
        navigate('/login');
    }

    const goHome = () => {
        navigate('/')
    }

    const goBack = () => navigate(-1);

    return (
        <nav className="navbar">
            <h1>FILM HUB</h1>
            <div className="buttons">
                {/* <Link to="/">Home</Link>
                <Link to="/create">Cerrar sesión</Link> */}
                <button onClick={goBack}> <FaArrowLeft size={'2em'} /> </button>
                <button onClick={goHome}> <FaHome size={'2em'} /> </button>
                {auth.email ? <button onClick={logout}> <FaSignOutAlt size={'2em'}/></button> : <button onClick={login}> <FaSignInAlt size={'2em'}/></button>}
            </div>
        </nav>
    )
}

export default Navbar