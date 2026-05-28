import { NavLink } from 'react-router';

function Menu() {
  return (
    <nav>
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
      </ul>
    </nav>
  );
}

export default Menu;