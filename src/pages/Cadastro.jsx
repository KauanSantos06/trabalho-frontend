import { useState } from 'react';
import { useUsers } from '../contexts/UserContext';

export default function Cadastro() {
  const { addUser } = useUsers();

  const [nome, setNome] = useState('');
  const [senha, setSenha] = useState('');
  const [erros, setErros] = useState({});
  const [sucesso, setSucesso] = useState(false);

  // Validação em tempo real (pode ser chamada no onBlur ou onChange)
  const validar = () => {
    const novosErros = {};
    if (nome.trim().length < 3) {
      novosErros.nome = 'Nome deve ter pelo menos 3 caracteres.';
    }
    if (senha.length < 6) {
      novosErros.senha = 'Senha deve ter no mínimo 6 caracteres.';
    }
    setErros(novosErros);
    return Object.keys(novosErros).length === 0; // retorna true se válido
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validar()) return;

    addUser(nome.trim(), senha);
    setSucesso(true);
    setNome('');
    setSenha('');
    setErros({});

    // Feedback some após 3 segundos
    setTimeout(() => setSucesso(false), 3000);
  };

  // Desabilita botão se houver erros visíveis OU campos vazios
  const formInvalido = nome.trim().length < 3 || senha.length < 6;

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold text-green-800 mb-6">Cadastro de Jardineiro</h2>

      {sucesso && (
        <div className="mb-4 p-3 bg-green-100 text-green-800 rounded-lg">
          Cadastro realizado com sucesso!
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        {/* Campo Nome */}
        <div className="mb-4">
          <label htmlFor="nome" className="block text-sm font-medium text-gray-700">
            Nome
          </label>
          <input
            type="text"
            id="nome"
            value={nome}
            onChange={(e) => {
              setNome(e.target.value);
              if (erros.nome) validar(); // revalida ao digitar
            }}
            onBlur={validar}
            className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 ${
              erros.nome ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Seu nome de jardineiro"
          />
          {erros.nome && (
            <p className="mt-1 text-sm text-red-600">{erros.nome}</p>
          )}
        </div>

        {/* Campo Senha */}
        <div className="mb-6">
          <label htmlFor="senha" className="block text-sm font-medium text-gray-700">
            Senha
          </label>
          <input
            type="password"
            id="senha"
            value={senha}
            onChange={(e) => {
              setSenha(e.target.value);
              if (erros.senha) validar();
            }}
            onBlur={validar}
            className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 ${
              erros.senha ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Crie uma senha (mín. 6 caracteres)"
          />
          {erros.senha && (
            <p className="mt-1 text-sm text-red-600">{erros.senha}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={formInvalido}
          className={`w-full py-2 px-4 rounded-md font-semibold text-white transition-colors ${
            formInvalido
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500'
          }`}
        >
          Registrar
        </button>
      </form>
    </div>
  );
}