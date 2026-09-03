import { useNavigate } from "react-router-dom";

import "./EscolherTipo.css";


export default function EscolherTipo() {

  const navigate = useNavigate();


  return (

    <div className="escolher-tipo-page">

      {/* HEADER */}

      <header className="escolher-tipo-header">

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

      <main className="escolher-tipo-main">

        <div className="escolher-tipo-titulo">

          <span>
            CRIE SUA CONTA
          </span>


          <h2>
            Como você deseja usar o Celebra?
          </h2>


          <p>
            Escolha o tipo de conta que deseja criar
            e comece a aproveitar nossa plataforma.
          </p>

        </div>


        {/* OPÇÕES */}

        <div className="tipos-container">


          {/* CLIENTE */}

          <div className="tipo-card">

            <div className="tipo-icone">
              👤
            </div>


            <h2>
              Cliente
            </h2>


            <p>
              Quero organizar eventos, contratar
              fornecedores e gerenciar tudo
              em um só lugar.
            </p>


            <ul>

              <li>
                Planeje seu evento
              </li>

              <li>
                Encontre fornecedores
              </li>

              <li>
                Organize seus serviços
              </li>

            </ul>


            <button
              className="botao-cliente"
              onClick={() =>
                navigate("/cadastro/cliente")
              }
            >
              Criar conta como Cliente
            </button>

          </div>


          {/* FORNECEDOR */}

          <div className="tipo-card fornecedor-card">

            <div className="tipo-icone">
              🏢
            </div>


            <h2>
              Fornecedor
            </h2>


            <p>
              Quero divulgar meus serviços
              e encontrar clientes para
              eventos.
            </p>


            <ul>

              <li>
                Divulgue seus serviços
              </li>

              <li>
                Receba novos clientes
              </li>

              <li>
                Gerencie seus serviços
              </li>

            </ul>


            <button
              className="botao-fornecedor"
              onClick={() =>
                navigate("/cadastro/fornecedor")
              }
            >
              Criar conta como Fornecedor
            </button>

          </div>

        </div>


        {/* LOGIN */}

        <div className="escolher-tipo-login">

          <p>
            Já possui uma conta?
          </p>


          <button
            onClick={() =>
              navigate("/")
            }
          >
            Entrar na minha conta
          </button>

        </div>

      </main>

    </div>

  );

}