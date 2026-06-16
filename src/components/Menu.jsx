import { useState } from 'react';
import { NavLink } from 'react-router';

export default function Menu() {
  const [menuAberto, setMenuAberto] = useState(false);

  const links = [
    { to: '/', label: 'Home' },
    { to: '/listagem', label: 'Painel' },
    { to: '/cadastro', label: 'Cadastro' },
  ];

  return (
    <nav className="bg-green-700 text-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo / Nome do app */}
        <span className="text-xl font-bold tracking-wide">🌱 PlantCare</span>

        {/* Botão hambúrguer (visível apenas em mobile) */}
        <button
          className="md:hidden text-2xl focus:outline-none"
          onClick={() => setMenuAberto(!menuAberto)}
          aria-label="Abrir menu"
        >
          {menuAberto ? '✕' : '☰'}
        </button>

        {/* Links – sempre visíveis em desktop, controlados por estado em mobile */}
        <ul
          className={`${
            menuAberto ? 'flex' : 'hidden'
          } flex-col md:flex md:flex-row absolute md:static top-14 left-0 w-full md:w-auto bg-green-700 md:bg-transparent px-4 md:px-0 pb-4 md:pb-0 space-y-2 md:space-y-0 md:space-x-6 transition-all duration-300`}
        >
          {links.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  `block py-1 px-2 rounded hover:bg-green-600 transition ${
                    isActive ? 'font-semibold underline underline-offset-4' : ''
                  }`
                }
                onClick={() => setMenuAberto(false)} // fecha ao clicar em mobile
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}