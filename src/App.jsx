import { Routes, Route } from 'react-router';

import Home from "./pages/Home";
import Listagem from "./pages/Listagem";
import Cadastro from "./pages/Cadastro";
import Erro404 from "./pages/Erro404";

import Layout from "./layouts/Layout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="listagem" element={<Listagem />} />
        <Route path="cadastro" element={<Cadastro />} />
      </Route>

      <Route path="*" element={<Erro404 />} />
    </Routes>
  );
}

export default App;