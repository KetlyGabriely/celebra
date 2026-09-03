import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Login from "../views/Login/Login";
import PaginaApresentacao from "../views/PaginaApresentacao/PaginaApresentação";

import RotaProtegida from "./RotaProtegida";

// CADASTRO
import EscolherTipo from "../views/Cadastro/EscolherTipo";
import CadastroCliente from "../views/Cadastro/CadastroCliente";
import CadastroFornecedor from "../views/Cadastro/CadastroFornecedor";

// CLIENTE
import PaginaInicial from "../views/PaginaInicial/PaginaInicial";
import MontarEvento from "../views/MontarEvento/MontarEvento";
import SelecionarServicos from "../views/SelecionarServicos/SelecionarServicos";
import Resultados from "../views/Resultados/Resultados";

// FORNECEDOR
import InicioFornecedor from "../views/InicioFornecedor/InicioFornecedor";
import MeusServicos from "../views/MeusServicos/MeusServicos";
import CadastrarServico from "../views/CadastrarServico/CadastrarServico";


export default function AppRoutes() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<PaginaApresentacao />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        {/* CADASTRO */}

        <Route
          path="/cadastro"
          element={<EscolherTipo />}
        />

        <Route
          path="/cadastro/cliente"
          element={<CadastroCliente />}
        />

        <Route
          path="/cadastro/fornecedor"
          element={<CadastroFornecedor />}
        />


        {/* ÁREA DO CLIENTE */}

        <Route
          path="/inicio"
          element={
            <RotaProtegida>
              <PaginaInicial />
            </RotaProtegida>
          }
        />

        <Route
          path="/montar-evento"
          element={
            <RotaProtegida>
              <MontarEvento />
            </RotaProtegida>
          }
        />

        <Route
          path="/selecionar-servicos"
          element={
            <RotaProtegida>
              <SelecionarServicos />
            </RotaProtegida>
          }
        />

        <Route
          path="/resultados"
          element={
            <RotaProtegida>
              <Resultados />
            </RotaProtegida>
          }
        />


        {/* ÁREA DO FORNECEDOR */}

        <Route
          path="/inicio-fornecedor"
          element={
            <RotaProtegida>
              <InicioFornecedor />
            </RotaProtegida>
          }
        />

        <Route
          path="/meus-servicos"
          element={
            <RotaProtegida>
              <MeusServicos />
            </RotaProtegida>
          }
        />

        <Route
          path="/cadastrar-servico"
          element={
            <RotaProtegida>
              <CadastrarServico />
            </RotaProtegida>
          }
        />


        {/* ROTA NÃO ENCONTRADA */}

        <Route
          path="*"
          element={<Login />}
        />

      </Routes>

    </BrowserRouter>

  );

}