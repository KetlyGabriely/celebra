import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import "./Resultados.css";


const nomesServicos: Record<string, string> = {

  FOTOGRAFIA: "Fotografia",

  GASTRONOMIA: "Gastronomia",

  FLORICULTURA: "Floricultura",

  MUSICA: "Música",

  DECORACAO: "Decoração",

  TRANSPORTE: "Transporte",

};


const iconesServicos: Record<string, string> = {

  FOTOGRAFIA: "📷",

  GASTRONOMIA: "🍽️",

  FLORICULTURA: "🌷",

  MUSICA: "🎵",

  DECORACAO: "✨",

  TRANSPORTE: "🚗",

};


export default function Resultados() {

  const navigate = useNavigate();

  const location = useLocation();


  const {
    orcamento,
    convidados,
    dataEvento,
    servicosSelecionados,
  } = location.state || {};


  if (!servicosSelecionados) {

    return (

      <div className="resultados">

        <header className="resultados-header">

          <h1>
            Celebra
          </h1>

        </header>


        <main className="resultados-vazio">

          <span>
            ✦
          </span>

          <h2>
            Nenhum evento encontrado
          </h2>

          <p>
            Parece que você ainda não iniciou
            o planejamento do seu evento.
          </p>


          <button
            onClick={() =>
              navigate("/montar-evento")
            }
          >
            Montar meu evento →
          </button>

        </main>

      </div>

    );

  }


  return (

    <div className="resultados">


      {/* HEADER */}

      <header className="resultados-header">

        <h1>
          Celebra
        </h1>


        <button
          onClick={() =>
            navigate("/inicio")
          }
        >
          ← Início
        </button>

      </header>


      {/* CONTEÚDO */}

      <main className="resultados-main">


        {/* TÍTULO */}

        <section className="resultados-titulo">

          <span>
            SEU PLANEJAMENTO
          </span>


          <h2>
            Seu evento está quase pronto! ✨
          </h2>


          <p>
            Encontramos opções com base nas
            escolhas que você fez para tornar
            seu evento especial.
          </p>

        </section>


        {/* RESUMO */}

        <section className="resumo-evento">

          <div className="resumo-titulo">

            <div>

              <span>
                RESUMO DO EVENTO
              </span>

              <h2>
                Suas escolhas
              </h2>

            </div>


            <span className="resumo-icone">
              ✦
            </span>

          </div>


          <div className="resumo-grid">


            {/* ORÇAMENTO */}

            <div className="resumo-item">

              <span className="resumo-item-icone">
                💰
              </span>


              <div>

                <small>
                  ORÇAMENTO
                </small>


                <strong>

                  R$ {Number(
                    orcamento || 0
                  ).toLocaleString(
                    "pt-BR"
                  )}

                </strong>

              </div>

            </div>


            {/* CONVIDADOS */}

            <div className="resumo-item">

              <span className="resumo-item-icone">
                👥
              </span>


              <div>

                <small>
                  CONVIDADOS
                </small>


                <strong>
                  {convidados || 0} pessoas
                </strong>

              </div>

            </div>


            {/* DATA */}

            <div className="resumo-item">

              <span className="resumo-item-icone">
                📅
              </span>


              <div>

                <small>
                  DATA DO EVENTO
                </small>


                <strong>
                  {dataEvento || "Não informada"}
                </strong>

              </div>

            </div>


          </div>

        </section>


        {/* SERVIÇOS */}

        <section className="servicos-escolhidos">


          <div className="servicos-escolhidos-titulo">

            <span>
              SERVIÇOS SELECIONADOS
            </span>


            <h2>
              O que você está procurando
            </h2>


            <p>
              Estes são os serviços que serão
              considerados na busca por fornecedores.
            </p>

          </div>


          <div className="servicos-escolhidos-grid">

            {servicosSelecionados.map(
              (servico: string) => (

                <div
                  className="servico-escolhido-card"
                  key={servico}
                >

                  <div className="servico-escolhido-icone">

                    {iconesServicos[servico]}

                  </div>


                  <div>

                    <h3>

                      {nomesServicos[servico]}

                    </h3>


                    <p>
                      Serviço selecionado para
                      o seu evento.
                    </p>

                  </div>


                  <span className="servico-check">
                    ✓
                  </span>

                </div>

              )
            )}

          </div>

        </section>


        {/* PRÓXIMO PASSO */}

        <section className="proximo-passo">

          <div className="proximo-conteudo">

            <span>
              PRÓXIMO PASSO
            </span>


            <h2>
              Vamos encontrar os melhores
              profissionais para você
            </h2>


            <p>
              Com base nas informações do seu
              evento, o Celebra poderá encontrar
              fornecedores compatíveis com suas
              necessidades.
            </p>

          </div>


          <div className="proximo-acoes">

            <button
              className="botao-editar-evento"
              onClick={() =>
                navigate("/selecionar-servicos")
              }
            >
              ← Alterar serviços
            </button>


            <button
              className="botao-buscar-fornecedores"
              onClick={() =>
                alert(
                  "Em breve serão exibidos os fornecedores disponíveis!"
                )
              }
            >
              Buscar fornecedores →
            </button>

          </div>

        </section>


        {/* FINALIZAR */}

        <div className="resultados-finalizar">

          <button
            onClick={() =>
              navigate("/inicio")
            }
          >
            Finalizar depois
          </button>

        </div>


      </main>

    </div>

  );

}