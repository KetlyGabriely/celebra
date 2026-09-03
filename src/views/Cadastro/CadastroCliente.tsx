import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { cadastrar } from "../../controllers/authController";

import "./CadastroCliente.css";


export default function CadastroCliente() {

  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] =
    useState("");

  const [erro, setErro] = useState("");
  const [carregando, setCarregando] =
    useState(false);


  async function cadastrarCliente() {

    try {

      setErro("");

      if (senha !== confirmarSenha) {

        throw new Error(
          "As senhas não coincidem."
        );

      }

      setCarregando(true);

      await cadastrar(
        email,
        senha,
        nome,
        telefone,
        "CLIENTE"
      );

      alert(
        "Cadastro realizado com sucesso!"
      );

      navigate("/");

    } catch (error) {

      setErro(
        error instanceof Error
          ? error.message
          : "Erro ao realizar cadastro."
      );

    } finally {

      setCarregando(false);

    }

  }


  return (

    <div className="cadastro-cliente-page">

      {/* HEADER */}

      <header className="cadastro-cliente-header">

        <h1>
          Celebra
        </h1>


        <button
          onClick={() =>
            navigate("/")
          }
        >
          Login
        </button>

      </header>


      {/* CONTEÚDO */}

      <main className="cadastro-cliente-main">

        <div className="cadastro-cliente-card">


          {/* TÍTULO */}

          <div className="cadastro-cliente-titulo">

            <span>
              CONTA DE CLIENTE
            </span>


            <h2>
              Crie sua conta
            </h2>


            <p>
              Comece a planejar momentos
              especiais com o Celebra.
            </p>

          </div>


          {/* ERRO */}

          {erro && (

            <div className="cadastro-cliente-erro">

              {erro}

            </div>

          )}


          {/* NOME */}

          <div className="campo-cadastro">

            <label>
              Nome completo
            </label>

            <input
              type="text"
              placeholder="Digite seu nome completo"
              value={nome}
              onChange={(e) =>
                setNome(e.target.value)
              }
            />

          </div>


          {/* TELEFONE */}

          <div className="campo-cadastro">

            <label>
              Telefone
            </label>

            <input
              type="tel"
              placeholder="(00) 00000-0000"
              value={telefone}
              onChange={(e) =>
                setTelefone(e.target.value)
              }
            />

          </div>


          {/* EMAIL */}

          <div className="campo-cadastro">

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

          <div className="campo-cadastro">

            <label>
              Senha
            </label>

            <input
              type="password"
              placeholder="Mínimo de 6 caracteres"
              value={senha}
              onChange={(e) =>
                setSenha(e.target.value)
              }
            />

          </div>


          {/* CONFIRMAR SENHA */}

          <div className="campo-cadastro">

            <label>
              Confirmar senha
            </label>

            <input
              type="password"
              placeholder="Digite sua senha novamente"
              value={confirmarSenha}
              onChange={(e) =>
                setConfirmarSenha(
                  e.target.value
                )
              }
            />

          </div>


          {/* BOTÃO */}

          <button
            className="botao-criar-conta"
            onClick={cadastrarCliente}
            disabled={carregando}
          >

            {carregando
              ? "Criando conta..."
              : "Criar minha conta"}

          </button>


          {/* VOLTAR */}

          <button
            className="botao-voltar-cadastro"
            onClick={() =>
              navigate("/cadastro")
            }
          >
            Voltar
          </button>


          {/* LOGIN */}

          <div className="cadastro-login">

            <p>
              Já possui uma conta?
            </p>


            <button
              onClick={() =>
                navigate("/")
              }
            >
              Entrar
            </button>

          </div>

        </div>

      </main>

    </div>

  );

}