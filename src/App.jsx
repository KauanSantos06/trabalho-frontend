import { Routes, Route } from 'react-router';

import Home from "./pages/Home";
import Listagem from "./pages/Listagem";
import Cadastro from "./pages/Cadastro";
import Login from "./pages/Login";
import Erro404 from "./pages/Erro404";

import Layout from "./layouts/Layout";

import { useAuth } from './contexts/AuthContext';

function App() {

    const { logado } = useAuth();

    return (

        <Routes>

            {logado ? (

                <Route path="/" element={<Layout />}>

                    <Route index element={<Home />} />

                    <Route
                        path="listagem"
                        element={<Listagem />}
                    />

                    <Route
                        path="cadastro"
                        element={<Cadastro />}
                    />

                </Route>

            ) : (

                <Route
                    path="/login"
                    element={<Login />}
                />

            )}

            <Route
                path="*"
                element={<Erro404 />}
            />

        </Routes>
    );
}

export default App;