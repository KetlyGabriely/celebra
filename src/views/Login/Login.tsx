import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { entrar } from "../../controllers/authController";


export default function Login() {

  const navigate = useNavigate();

  const [email, setEmail] =
    useState("");

  const [senha, setSenha] =
    useState("");

  const [erro, setErro] =
    useState("");

  const [carregando, setCarregando] =
    useState(false);


  async function acessar() {

    try {

      setErro("");
      setCarregando(true);

      const resultado = await entrar(
        email,
        senha
      );

      if (
        resultado.usuario.tipo ===
        "FORNECEDOR"
      ) {

        navigate(
          "/dashboard-fornecedor"
        );

      } else {

        navigate(
          "/dashboard"
        );

      }

    } catch (error) {

      setErro(
        error instanceof Error
          ? error.message
          : "Erro ao realizar login."
      );

    } finally {

      setCarregando(false);

    }

  }


  return (

    <div>

      <h1>Celebra</h1>

      <h2>Entrar</h2>

      <p>
        Acesse sua conta para
        continuar.
      </p>


      {erro && (
        <p>
          {erro}
        </p>
      )}


      <input
        type="email"
        placeholder="E-mail"
        value={email}
        onChange={(e) =>
          setEmail(e.target.value)
        }
      />


      <input
        type="password"
        placeholder="Senha"
        value={senha}
        onChange={(e) =>
          setSenha(e.target.value)
        }
      />


      <button
        onClick={acessar}
        disabled={carregando}
      >

        {carregando
          ? "Entrando..."
          : "Entrar"}

      </button>


      <p>
        Ainda não possui uma conta?
      </p>


      <button
        onClick={() =>
          navigate("/cadastro")
        }
      >
        Criar conta
      </button>

    </div>

  );

}