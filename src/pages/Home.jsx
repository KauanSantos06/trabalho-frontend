import { Link } from 'react-router';

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 text-center">
      {/* Hero */}
      <div className="mb-10">
        <span className="text-6xl">🌿</span>
        <h1 className="text-4xl md:text-5xl font-extrabold text-green-800 mt-4 mb-4">
          Bem-vindo ao PlantCare
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Monitore a saúde das suas plantas com sensores inteligentes.
          Cadastre-se como jardineiro e acompanhe em tempo real a umidade,
          temperatura e luminosidade do seu jardim.
        </p>
      </div>

      {/* Call to action */}
      <Link
        to="/cadastro"
        className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition transform hover:scale-105"
      >
        🌱 Cadastrar agora
      </Link>

      {/* Vantagens */}
      <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-xl shadow">
          <span className="text-3xl">💧</span>
          <h3 className="font-semibold text-green-800 mt-2">Umidade</h3>
          <p className="text-sm text-gray-600 mt-1">
            Sensores de solo para não errar na rega.
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow">
          <span className="text-3xl">🌡️</span>
          <h3 className="font-semibold text-green-800 mt-2">Temperatura</h3>
          <p className="text-sm text-gray-600 mt-1">
            Acompanhe se o ambiente está ideal.
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow">
          <span className="text-3xl">☀️</span>
          <h3 className="font-semibold text-green-800 mt-2">Luminosidade</h3>
          <p className="text-sm text-gray-600 mt-1">
            Garanta a luz perfeita para cada planta.
          </p>
        </div>
      </div>
    </div>
  );
}