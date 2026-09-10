import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

// APRESENTAÇÃO E LOGIN
import PaginaApresentacao from "../views/PaginaApresentacao/PaginaApresentação";
import Login from "../views/Login/Login";

import RotaProtegida from "./RotaProtegida";

// CADASTRO
import EscolherTipo from "../views/Cadastro/EscolherTipo";
import CadastroCliente from "../views/Cadastro/CadastroCliente";
import CadastroFornecedor from "../views/Cadastro/CadastroFornecedor";

// CLIENTE
import PaginaInicial from "../views/Cliente/PaginaInicial/PaginaInicial";
import MontarEvento from "../views/Cliente/MontarEvento/MontarEvento";
import SelecionarServicos from "../views/Cliente/SelecionarServicos/SelecionarServicos";
import Resultados from "../views/Cliente/Resultados/Resultados";
import MeusEventosCliente from "../views/Cliente/MeusEventosCliente/MeusEventosCliente";
import PerfilCliente from "../views/Cliente/PerfilCliente/PerfilCliente";

// FORNECEDOR
import InicioFornecedor from "../views/Fornecedores/InicioFornecedor/InicioFornecedor";
import MeusServicos from "../views/Fornecedores/MeusServicos/MeusServicos";
import CadastrarServico from "../views/Fornecedores/CadastrarServico/CadastrarServico";
import MeusEventos from "../views/Fornecedores/MeusEventos/MeusEventos";
import PerfilFornecedor from "../views/Fornecedores/PerfilFornecedor/PerfilFornecedor";


export default function AppRoutes() {

  return (

    <BrowserRouter>

      <Routes>

        {/* =========================
            PÁGINA DE APRESENTAÇÃO
        ========================= */}

        <Route
          path="/"
          element={<PaginaApresentacao />}
        />


        {/* =========================
            LOGIN
        ========================= */}

        <Route
          path="/login"
          element={<Login />}
        />


        {/* =========================
            CADASTRO
        ========================= */}

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


        {/* =========================
            ÁREA DO CLIENTE
        ========================= */}

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


        {/* =========================
            ÁREA DO FORNECEDOR
        ========================= */}

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

        <Route
          path="/meus-eventos"
          element={
            <RotaProtegida>
              <MeusEventos />
            </RotaProtegida>
          }
        />

        <Route
          path="/perfil-fornecedor"
          element={<PerfilFornecedor />}
        />

        <Route
          path="/meus-eventos-cliente"
          element={<MeusEventosCliente />}
        />

        <Route
          path="/perfil"
          element={<PerfilCliente />}
        />


        {/* =========================
            ROTA NÃO ENCONTRADA
        ========================= */}

        <Route
          path="*"
          element={<PaginaApresentacao />}
        />

      </Routes>

    </BrowserRouter>

  );

}