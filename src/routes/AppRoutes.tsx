import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Login from "../views/Login/Login";
import EscolherTipo from "../views/Cadastro/EscolherTipo";
import CadastroCliente from "../views/Cadastro/CadastroCliente";
import CadastroFornecedor from "../views/Cadastro/CadastroFornecedor";


function DashboardCliente() {
  return <h1>Dashboard do Cliente</h1>;
}


function DashboardFornecedor() {
  return <h1>Dashboard do Fornecedor</h1>;
}


export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/cadastro"
          element={<EscolherTipo />}
        />

        <Route
          path="/dashboard"
          element={<DashboardCliente />}
        />

        <Route
          path="/dashboard-fornecedor"
          element={<DashboardFornecedor />}
        />

        <Route
          path="/cadastro/cliente"
          element={<CadastroCliente />}
        />

        <Route
          path="/cadastro/fornecedor"
          element={<CadastroFornecedor />}
        />

      </Routes>
    </BrowserRouter>
  );
}