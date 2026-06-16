import { useState } from 'react';
import { useUsers } from '../contexts/UserContext';
import { addSensor } from '../services/api';

export default function Cadastro() {
  const { users, addUser } = useUsers();

  // Estados do formulário de jardineiro
  const [nome, setNome] = useState('');
  const [senha, setSenha] = useState('');
  const [errosJardineiro, setErrosJardineiro] = useState({});
  const [sucessoJardineiro, setSucessoJardineiro] = useState(false);

  // Estados do formulário de sensor
  const [tipoSensor, setTipoSensor] = useState('');
  const [valorSensor, setValorSensor] = useState('');   // 👈 Agora é digitável
  const [statusSensor, setStatusSensor] = useState('OK');
  const [plantaSensor, setPlantaSensor] = useState('');
  const [donoSensor, setDonoSensor] = useState('');
  const [errosSensor, setErrosSensor] = useState({});
  const [sucessoSensor, setSucessoSensor] = useState(false);
  const [loadingSensor, setLoadingSensor] = useState(false);

  // Opções para os radio buttons
  const tipos = ['Umidade', 'Temperatura', 'Luz'];
  const statusList = ['OK', 'Alerta'];

  // ---------- Validação Jardineiro ----------
  const validarJardineiro = () => {
    const erros = {};
    if (nome.trim().length < 3) erros.nome = 'Nome deve ter pelo menos 3 caracteres.';
    if (senha.length < 6) erros.senha = 'Senha deve ter no mínimo 6 caracteres.';
    setErrosJardineiro(erros);
    return Object.keys(erros).length === 0;
  };

  const handleSubmitJardineiro = (e) => {
    e.preventDefault();
    if (!validarJardineiro()) return;
    addUser(nome.trim(), senha);
    setSucessoJardineiro(true);
    setNome('');
    setSenha('');
    setErrosJardineiro({});
    setTimeout(() => setSucessoJardineiro(false), 3000);
  };

  // ---------- Validação Sensor ----------
  const validarSensor = () => {
    const erros = {};
    if (!tipoSensor) erros.tipo = 'Selecione um tipo.';
    if (!valorSensor.trim()) erros.valor = 'Valor é obrigatório.';
    if (!plantaSensor.trim()) erros.planta = 'Nome da planta é obrigatório.';
    if (!donoSensor) erros.dono = 'Selecione um dono.';
    setErrosSensor(erros);
    return Object.keys(erros).length === 0;
  };

  const handleSubmitSensor = async (e) => {
    e.preventDefault();
    if (!validarSensor()) return;

    const novoSensor = {
      nome: `Sensor de ${tipoSensor}`,
      tipo: tipoSensor,
      valor: valorSensor.trim(),
      status: statusSensor,
      planta: plantaSensor.trim(),
      dono: donoSensor,
    };

    try {
      setLoadingSensor(true);
      console.log('Enviando sensor:', novoSensor);
      await addSensor(novoSensor);
      setSucessoSensor(true);
      // Limpa os campos
      setTipoSensor('');
      setValorSensor('');
      setStatusSensor('OK');
      setPlantaSensor('');
      setDonoSensor('');
      setErrosSensor({});
      setTimeout(() => setSucessoSensor(false), 3000);
    } catch (error) {
      console.error('Erro ao cadastrar sensor:', error);
      setErrosSensor({ geral: error.message || 'Erro ao cadastrar sensor. Verifique se o servidor está rodando.' });
    } finally {
      setLoadingSensor(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-6 px-4 space-y-10">
      {/* ---------- Formulário Jardineiro ---------- */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <h2 className="text-2xl font-bold text-green-800 mb-6">Cadastro de Jardineiro</h2>
        {sucessoJardineiro && (
          <div className="mb-4 p-3 bg-green-100 text-green-800 rounded">Cadastro realizado!</div>
        )}
        <form onSubmit={handleSubmitJardineiro} noValidate>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Nome</label>
            <input
              type="text"
              value={nome}
              onChange={(e) => {
                setNome(e.target.value);
                if (errosJardineiro.nome) validarJardineiro();
              }}
              onBlur={validarJardineiro}
              className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 ${
                errosJardineiro.nome ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Seu nome de jardineiro"
            />
            {errosJardineiro.nome && <p className="text-sm text-red-600 mt-1">{errosJardineiro.nome}</p>}
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">Senha</label>
            <input
              type="password"
              value={senha}
              onChange={(e) => {
                setSenha(e.target.value);
                if (errosJardineiro.senha) validarJardineiro();
              }}
              onBlur={validarJardineiro}
              className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 ${
                errosJardineiro.senha ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Crie uma senha (mín. 6 caracteres)"
            />
            {errosJardineiro.senha && <p className="text-sm text-red-600 mt-1">{errosJardineiro.senha}</p>}
          </div>
          <button
            type="submit"
            disabled={nome.trim().length < 3 || senha.length < 6}
            className={`w-full py-2 rounded-md font-semibold text-white transition ${
              nome.trim().length < 3 || senha.length < 6
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-green-600 hover:bg-green-700'
            }`}
          >
            Registrar
          </button>
        </form>
      </div>

      {/* ---------- Formulário Sensor ---------- */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <h2 className="text-2xl font-bold text-green-800 mb-6">Cadastro de Sensor</h2>
        {sucessoSensor && (
          <div className="mb-4 p-3 bg-green-100 text-green-800 rounded">Sensor cadastrado com sucesso!</div>
        )}
        {errosSensor.geral && (
          <div className="mb-4 p-3 bg-red-100 text-red-800 rounded">{errosSensor.geral}</div>
        )}
        <form onSubmit={handleSubmitSensor} noValidate>
          {/* Dono (select) */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Dono do sensor</label>
            <select
              value={donoSensor}
              onChange={(e) => setDonoSensor(e.target.value)}
              onBlur={validarSensor}
              className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 ${
                errosSensor.dono ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Selecione um jardineiro</option>
              {users.map((user) => (
                <option key={user.id} value={user.nome}>
                  {user.nome}
                </option>
              ))}
            </select>
            {users.length === 0 && (
              <p className="text-sm text-gray-500 mt-1">Nenhum jardineiro cadastrado. Cadastre um primeiro.</p>
            )}
            {errosSensor.dono && <p className="text-sm text-red-600 mt-1">{errosSensor.dono}</p>}
          </div>

          {/* Tipo - radio buttons */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Tipo</label>
            <div className="flex flex-wrap gap-4">
              {tipos.map((tipo) => (
                <label key={tipo} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="tipo"
                    value={tipo}
                    checked={tipoSensor === tipo}
                    onChange={(e) => {
                      setTipoSensor(e.target.value);
                      if (errosSensor.tipo) validarSensor();
                    }}
                    className="text-green-600 focus:ring-green-500"
                  />
                  <span>{tipo}</span>
                </label>
              ))}
            </div>
            {errosSensor.tipo && <p className="text-sm text-red-600 mt-1">{errosSensor.tipo}</p>}
          </div>

          {/* Valor - campo de texto livre */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Valor</label>
            <input
              type="text"
              value={valorSensor}
              onChange={(e) => {
                setValorSensor(e.target.value);
                if (errosSensor.valor) validarSensor();
              }}
              onBlur={validarSensor}
              className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 ${
                errosSensor.valor ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Ex: 78%, 23°C, 1200 lux"
            />
            {errosSensor.valor && <p className="text-sm text-red-600 mt-1">{errosSensor.valor}</p>}
          </div>

          {/* Status - radio buttons */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <div className="flex gap-4">
              {statusList.map((status) => (
                <label key={status} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="status"
                    value={status}
                    checked={statusSensor === status}
                    onChange={(e) => setStatusSensor(e.target.value)}
                    className="text-green-600 focus:ring-green-500"
                  />
                  <span>{status}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Planta - campo de texto livre */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">Planta</label>
            <input
              type="text"
              value={plantaSensor}
              onChange={(e) => {
                setPlantaSensor(e.target.value);
                if (errosSensor.planta) validarSensor();
              }}
              onBlur={validarSensor}
              className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 ${
                errosSensor.planta ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Ex: Cacto, Samambaia"
            />
            {errosSensor.planta && <p className="text-sm text-red-600 mt-1">{errosSensor.planta}</p>}
          </div>

          <button
            type="submit"
            disabled={loadingSensor || users.length === 0}
            className="w-full py-2 rounded-md font-semibold text-white bg-blue-600 hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loadingSensor ? 'Cadastrando...' : 'Cadastrar Sensor'}
          </button>
        </form>
      </div>
    </div>
  );
}

