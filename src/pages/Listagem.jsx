import { useEffect, useState } from 'react';
import { useUsers } from '../contexts/UserContext';   // <-- useUsers importado
import { getSensores } from '../services/api';

export default function Listagem() {
  const { users } = useUsers();                       // <-- pega a lista de jardineiros
  const [sensores, setSensores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    async function carregarSensores() {
      try {
        setLoading(true);
        const dados = await getSensores();
        setSensores(dados);
      } catch (err) {
        setErro('Falha ao conectar com os sensores.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    carregarSensores();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-green-800 mb-8">🌱 Painel de Monitoramento</h2>

      {/* ---------- SEÇÃO DOS JARDINEIROS ---------- */}
      <section className="mb-10">
        <h3 className="text-2xl font-semibold text-green-700 mb-4">Jardineiros Cadastrados</h3>
        {users.length === 0 ? (
          <p className="text-gray-500 italic">Nenhum jardineiro cadastrado ainda.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {users.map((user) => (
              <div key={user.id} className="bg-white p-4 rounded-xl shadow border-l-4 border-green-500">
                <p className="text-lg font-medium text-gray-800">{user.nome}</p>
                <p className="text-sm text-gray-500">Senha: ••••••</p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ---------- SEÇÃO DOS SENSORES ---------- */}
      <section>
        <h3 className="text-2xl font-semibold text-green-700 mb-4">Sensores Ativos</h3>
        {loading && <p className="text-gray-500">🔍 Conectando aos sensores...</p>}
        {erro && <p className="text-red-600 bg-red-50 p-3 rounded">{erro}</p>}
        {!loading && !erro && sensores.length === 0 && (
          <p className="text-gray-500 italic">Nenhum sensor encontrado.</p>
        )}
        {!loading && !erro && sensores.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {sensores.map((sensor) => (
              <div key={sensor.id} className="bg-white p-5 rounded-xl shadow hover:shadow-md transition">
                <h4 className="text-lg font-semibold text-gray-800">{sensor.nome}</h4>
                <p className="text-sm text-gray-600 mt-1">Planta: {sensor.planta}</p>
                {sensor.dono && (
                  <p className="text-sm text-gray-600 mt-1">
                    Dono: <span className="font-medium text-green-800">{sensor.dono}</span>
                  </p>
                )}
                <p className="text-2xl font-bold text-green-700 mt-2">{sensor.valor}</p>
                <span
                  className={`inline-block mt-3 px-2 py-1 text-xs font-semibold rounded-full ${
                    sensor.status === 'OK' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}
                >
                  {sensor.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}