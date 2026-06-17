import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [users, setUsers] = useState(() => {
    // Inicializa com os dados salvos, se existirem
    const saved = localStorage.getItem('plantcare_users');
    return saved ? JSON.parse(saved) : [];
  });

  // Salva no localStorage sempre que users mudar
  useEffect(() => {
    localStorage.setItem('plantcare_users', JSON.stringify(users));
  }, [users]);

  const addUser = (nome, senha) => {
    const newUser = {
      id: crypto.randomUUID?.() || Date.now(),
      nome,
      senha,
    };
    setUsers((prev) => [...prev, newUser]);
  };

  return (
    <UserContext.Provider value={{ users, addUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUsers() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUsers deve ser usado dentro de um UserProvider");
  }
  return context;
}