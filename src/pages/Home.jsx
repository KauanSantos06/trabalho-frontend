import { useUsers } from '../contexts/UserContext';

function Home() {
  const { users, addUser } = useUsers();

  return (
    <div>
      <h1>PlantCare</h1>
      <button onClick={() => addUser('Teste', '123456')}>
        Adicionar dono de teste
      </button>
      <p>Donos cadastrados: {users.length}</p>
    </div>
  );
}

export default Home;