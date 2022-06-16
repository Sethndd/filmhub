// import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import MenuPrincipal from "./MenuPrincipal";
import MenuAdmin from './MenuAdmin'

const Menu = () => {
    const { auth } = useAuth();
    // const navigate = useNavigate();

    return (
        auth?.roles?.find(role => 'admin' === role) ? <MenuAdmin/> : <MenuPrincipal/>
    )
}

export default Menu