import { useNavigate } from "react-router-dom";

import "./MeusEventos.css";


export default function MeusEventos() {

  const navigate = useNavigate();


  const eventos = [

    {
      id: 1,
      nome: "Casamento de Ana e Lucas",
      tipo: "Casamento",
      data: "15 de Novembro de 2026",
      convidados: 180,
      local: "Itapetininga - SP",
      status: "Novo evento",
      servico: "Fotografia",
    },

    {
      id: 2,
      nome: "Formatura Engenharia",
      tipo: "Formatura",
      data: "10 de Dezembro de 2026",
      convidados: 250,
      local: "Sorocaba - SP",
      status: "Em análise",
      servico: "Decoração",
    },

    {
      id: 3,
      nome: "Aniversário de 18 anos",
      tipo: "Aniversário",
      data: "22 de Janeiro de 2027",
      convidados: 80,
      local: "São Paulo - SP",
      status: "Disponível",
      servico: "Fotografia",
    },

  ];


  return (

    <div className="meus-eventos-page">


      {/* HEADER */}

      <header className="meus-eventos-header">

        <div className="meus-eventos-logo">

          <h1>
            Celebra
          </h1>

          <span>
            ÁREA DO FORNECEDOR
          </span>

        </div>


        <button
          className="meus-eventos-voltar-header"
          onClick={() =>
            navigate("/inicio-fornecedor")
          }
        >
          ← Painel
        </button>

      </header>


      {/* CONTEÚDO */}

      <main className="meus-eventos-main">


        {/* TÍTULO */}

        <section className="meus-eventos-topo">

          <div>

            <span className="meus-eventos-tag">
              OPORTUNIDADES
            </span>


            <h2>
              Eventos para você
            </h2>


            <p>
              Encontre eventos compatíveis com os
              serviços oferecidos pela sua empresa.
            </p>

          </div>


          <div className="eventos-resumo">

            <strong>
              {eventos.length}
            </strong>

            <span>
              oportunidades disponíveis
            </span>

          </div>

        </section>


        {/* FILTROS */}

        <section className="eventos-filtros">

          <button className="filtro-ativo">
            Todos
          </button>

          <button>
            Novos
          </button>

          <button>
            Em análise
          </button>

          <button>
            Próximos eventos
          </button>

        </section>


        {/* LISTA */}

        <section className="eventos-lista">


          {eventos.map(
            (evento) => (

              <article
                className="evento-fornecedor-card"
                key={evento.id}
              >


                {/* ÍCONE */}

                <div className="evento-fornecedor-icone">

                  📅

                </div>


                {/* INFORMAÇÕES */}

                <div className="evento-fornecedor-info">


                  <div className="evento-card-topo">

                    <span className="evento-tipo">

                      {evento.tipo}

                    </span>


                    <span className="evento-status">

                      {evento.status}

                    </span>

                  </div>


                  <h3>

                    {evento.nome}

                  </h3>


                  <p className="evento-servico">

                    Serviço procurado:
                    {" "}

                    <strong>

                      {evento.servico}

                    </strong>

                  </p>


                  <div className="evento-detalhes">


                    <span>

                      📅 {evento.data}

                    </span>


                    <span>

                      👥 {evento.convidados} convidados

                    </span>


                    <span>

                      📍 {evento.local}

                    </span>

                  </div>

                </div>


                {/* AÇÃO */}

                <button
                  className="botao-ver-evento"
                >

                  Ver oportunidade →

                </button>


              </article>

            )
          )}


        </section>


        {/* INFORMAÇÃO */}

        <section className="eventos-info">

          <div>

            ✦

          </div>


          <div>

            <h3>

              Como funcionam as oportunidades?

            </h3>


            <p>

              Os eventos são exibidos de acordo com
              os serviços cadastrados pela sua empresa.
              Mantenha seus serviços atualizados para
              receber mais oportunidades.

            </p>

          </div>


          <button
            onClick={() =>
              navigate("/meus-servicos")
            }
          >

            Gerenciar serviços →

          </button>

        </section>


      </main>


    </div>

  );

}