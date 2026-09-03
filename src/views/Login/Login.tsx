import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { entrar } from "../../controllers/authController";

import "./Login.css";


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
          "/inicio-fornecedor"
        );

      } else {

        navigate(
          "/inicio"
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

    <div className="login-page">

      <div className="login-container">


        {/* LOGO */}

        <div className="login-logo">

          <h1>
            Celebra
          </h1>

          <span>
            ✦
          </span>

        </div>


        {/* CARD */}

        <div className="login-card">

          <div className="login-header">

            <span>
              BEM-VINDO DE VOLTA
            </span>

            <h2>
              Entrar na sua conta
            </h2>

            <p>
              Acesse sua conta para continuar
              planejando momentos especiais.
            </p>

          </div>


          {/* ERRO */}

          {erro && (

            <div className="login-erro">

              {erro}

            </div>

          )}


          {/* EMAIL */}

          <div className="campo-login">

            <label>
              E-mail
            </label>

            <input
              type="email"
              placeholder="Digite seu e-mail"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />

          </div>


          {/* SENHA */}

          <div className="campo-login">

            <label>
              Senha
            </label>

            <input
              type="password"
              placeholder="Digite sua senha"
              value={senha}
              onChange={(e) =>
                setSenha(e.target.value)
              }
            />

          </div>


          {/* BOTÃO */}

          <button
            className="botao-login"
            onClick={acessar}
            disabled={carregando}
          >

            {carregando
              ? "Entrando..."
              : "Entrar"}

          </button>


          {/* CADASTRO */}

          <div className="login-cadastro">

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

          <button
            className="login-voltar-apresentacao"
            onClick={() =>
              navigate("/")
            }
          >
            Voltar para apresentação
          </button>

        </div>


        <p className="login-rodape">
          Planeje. Celebre. Viva momentos inesquecíveis.
        </p>

      </div>

    </div>

  );

}