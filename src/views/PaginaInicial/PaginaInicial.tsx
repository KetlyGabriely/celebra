import { useNavigate } from "react-router-dom";

import "./PaginaInicial.css";


export default function PaginaInicial() {

  const navigate = useNavigate();


  function montarEvento() {

    navigate("/montar-evento");

  }


  function escolherEvento(tipo: string) {

    navigate(
      "/montar-evento",
      {
        state: {
          tipoEvento: tipo,
        },
      }
    );

  }


  return (

    <div className="pagina-inicial">

      {/* HEADER */}

      <header className="pagina-header">

        <h1 className="logo">
          Celebra
        </h1>


        <nav className="pagina-nav">

          <button>
            Como funciona
          </button>

          <button>
            O que você encontra
          </button>

          <button>
            Profissionais
          </button>

          <button>
            Depoimentos
          </button>

        </nav>


        <button
          className="header-button"
          onClick={montarEvento}
        >
          Planejar evento
        </button>

      </header>


      {/* CONTEÚDO */}

      <main className="pagina-main">

        <div className="pagina-conteudo">

          <span className="pagina-tag">
            PLANEJE SEU EVENTO
          </span>


          <h2>
            Qual é o seu evento?
          </h2>


          <p className="pagina-subtitulo">
            Isso nos ajuda a sugerir os melhores
            espaços e profissionais para tornar
            seu evento especial.
          </p>


          {/* OPÇÕES */}

          <div className="eventos-container">


            <button
              className="evento-card"
              onClick={() =>
                escolherEvento("CASAMENTO")
              }
            >

              <span className="evento-icone">
                ♡
              </span>

              <h3>
                Casamento
              </h3>

              <p>
                Planeje o seu grande dia
              </p>

            </button>


            <button
              className="evento-card"
              onClick={() =>
                escolherEvento("ANIVERSARIO")
              }
            >

              <span className="evento-icone">
                🎂
              </span>

              <h3>
                Aniversário
              </h3>

              <p>
                Celebre momentos especiais
              </p>

            </button>


            <button
              className="evento-card"
              onClick={() =>
                escolherEvento("FORMATURA")
              }
            >

              <span className="evento-icone">
                🎓
              </span>

              <h3>
                Formatura
              </h3>

              <p>
                Comemore essa conquista
              </p>

            </button>


            <button
              className="evento-card"
              onClick={() =>
                escolherEvento("FESTA")
              }
            >

              <span className="evento-icone">
                🎉
              </span>

              <h3>
                Festa / Evento
              </h3>

              <p>
                Crie uma celebração única
              </p>

            </button>

          </div>


          {/* BOTÃO */}

          <button
            className="montar-evento-button"
            onClick={montarEvento}
          >

            Montar meu evento
            <span>
            </span>

          </button>

        </div>

      </main>

    </div>

  );

}