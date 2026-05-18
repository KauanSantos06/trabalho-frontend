import { NavLink, useNavigate } from 'react-router';
import { useAuth } from '../contexts/AuthContext';

function Menu() {

    const { logout, usuario } = useAuth();

    const navigate = useNavigate();

    const handleSair = (e) => {
        e.preventDefault();
        logout();
        navigate("/login");
    }

    return (
        <nav>
            <h1> Olá {usuario.nome}</h1>

            <ul>
                <li>
                    <NavLink to="/"> Home </NavLink>
                </li>

                <li>
                    <NavLink to="/listagem"> Listagem </NavLink>
                </li>

                <li>
                    <NavLink to="/cadastro"> Cadastro </NavLink>
                </li>

                <li>
                    <a href="#" onClick={handleSair}> Sair </a>
                </li>
            </ul>
        </nav>
    );
}

export default Menu;