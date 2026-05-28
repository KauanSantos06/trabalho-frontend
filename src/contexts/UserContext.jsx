import { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export function UserProvider({ children }) {
  const [users, setUsers] = useState([]);

  // Adiciona um novo dono de planta
  const addUser = (nome, senha) => {
    const newUser = {
      id: crypto.randomUUID?.() || Date.now(), // gera ID único
      nome,
      senha, // em uma aplicação real, nunca armazenaríamos senha pura
    };
    setUsers((prev) => [...prev, newUser]);
  };

  return (
    <UserContext.Provider value={{ users, addUser }}>
      {children}
    </UserContext.Provider>
  );
}

// Hook personalizado para facilitar o consumo
export function useUsers() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUsers deve ser usado dentro de um UserProvider');
  }
  return context;
}