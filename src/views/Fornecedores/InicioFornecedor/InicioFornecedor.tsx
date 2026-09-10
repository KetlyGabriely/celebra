import { useNavigate } from "react-router-dom";

import "./InicioFornecedor.css";


export default function InicioFornecedor() {

  const navigate = useNavigate();


  return (

    <div className="inicio-fornecedor-page">


      {/* =========================================
          HEADER
      ========================================= */}

      <header className="inicio-fornecedor-header">

        <div className="fornecedor-logo">

          <h1>
            Celebra
          </h1>

          <span>
            ✦
          </span>

        </div>


        <nav className="fornecedor-nav">

          <button>
            Início
          </button>

          <button
            onClick={() =>
              navigate("/meus-servicos")
            }
          >
            Meus serviços
          </button>

          <button>
            Oportunidades
          </button>

        </nav>


        <button
          className="botao-sair"
          onClick={() =>
            navigate("/")
          }
        >
          Sair
        </button>

      </header>



      {/* =========================================
          CONTEÚDO PRINCIPAL
      ========================================= */}

      <main className="inicio-fornecedor-main">


        {/* BOAS-VINDAS */}

        <section className="fornecedor-hero">

          <div className="fornecedor-hero-texto">

            <span className="fornecedor-tag">
              ÁREA DO FORNECEDOR
            </span>


            <h2>
              Bem-vindo ao
              <br />

              <em>
                Celebra.
              </em>
            </h2>


            <p>
              Gerencie seus serviços, acompanhe
              oportunidades e conecte sua empresa
              a clientes que estão planejando
              momentos especiais.
            </p>


            <div className="hero-botoes">

              <button
                className="botao-principal-fornecedor"
                onClick={() =>
                  navigate("/meus-servicos")
                }
              >
                Gerenciar serviços
              </button>


              <button className="botao-secundario-fornecedor">

                Ver oportunidades

              </button>

            </div>

          </div>


          {/* RESUMO */}

          <div className="fornecedor-resumo-card">

            <span className="resumo-titulo">

              VISÃO GERAL

            </span>


            <div className="resumo-item">

              <div className="resumo-icone">
                📋
              </div>


              <div>

                <strong>
                  Meus serviços
                </strong>

                <p>
                  Gerencie seus serviços cadastrados
                </p>

              </div>

            </div>


            <div className="resumo-item">

              <div className="resumo-icone">
                📅
              </div>


              <div>

                <strong>
                  Eventos disponíveis
                </strong>

                <p>
                  Encontre novas oportunidades
                </p>

              </div>

            </div>


            <div className="resumo-item">

              <div className="resumo-icone">
                💰
              </div>


              <div>

                <strong>
                  Orçamentos
                </strong>

                <p>
                  Acompanhe solicitações recebidas
                </p>

              </div>

            </div>

          </div>

        </section>



        {/* =========================================
            ESTATÍSTICAS
        ========================================= */}

        <section className="estatisticas-fornecedor">


          <div className="estatistica-card">

            <span>
              📋
            </span>


            <div>

              <strong>
                Serviços
              </strong>

              <h3>
                Gerencie seus serviços
              </h3>

            </div>

          </div>


          <div className="estatistica-card">

            <span>
              📅
            </span>


            <div>

              <strong>
                Eventos
              </strong>

              <h3>
                Novas oportunidades
              </h3>

            </div>

          </div>


          <div className="estatistica-card">

            <span>
              💬
            </span>


            <div>

              <strong>
                Solicitações
              </strong>

              <h3>
                Consulte seus contatos
              </h3>

            </div>

          </div>


          <div className="estatistica-card">

            <span>
              ⭐
            </span>


            <div>

              <strong>
                Perfil
              </strong>

              <h3>
                Mantenha atualizado
              </h3>

            </div>

          </div>


        </section>



        {/* =========================================
            TÍTULO
        ========================================= */}

        <section className="fornecedor-acoes-titulo">

          <span>
            GERENCIE SUA EMPRESA
          </span>


          <h2>
            Tudo o que você precisa
            <br />

            em um só lugar.
          </h2>


          <p>
            Utilize as ferramentas abaixo para
            organizar seus serviços e acompanhar
            novas oportunidades.
          </p>

        </section>



        {/* =========================================
            CARDS PRINCIPAIS
        ========================================= */}

        <section className="fornecedor-grid">


          {/* MEUS SERVIÇOS */}

          <button
            className="fornecedor-card destaque-card"
            onClick={() =>
              navigate("/meus-servicos")
            }
          >

            <div className="fornecedor-card-icone">

              📋

            </div>


            <span className="card-tag">

              PRINCIPAL

            </span>


            <h3>
              Meus serviços
            </h3>


            <p>
              Cadastre, edite e gerencie todos
              os serviços oferecidos pela sua
              empresa.
            </p>


            <span className="card-link">

              Gerenciar serviços

            </span>

          </button>



          {/* EVENTOS */}

          <button
            className="fornecedor-card"
            onClick={() =>
              navigate("/meus-eventos")
            }
          >

            <div className="fornecedor-card-icone">

              📅

            </div>


            <h3>
              Meus eventos
            </h3>


            <p>
              Visualize eventos relacionados
              aos serviços oferecidos pela sua
              empresa.
            </p>


            <span className="card-link">

              Ver eventos

            </span>

          </button>



          {/* ORÇAMENTOS */}

          <button
            className="fornecedor-card"
            onClick={() =>
              navigate("/orcamentos")
            }
          >

            <div className="fornecedor-card-icone">

              💰

            </div>


            <h3>
              Orçamentos
            </h3>


            <p>
              Consulte solicitações de clientes
              e acompanhe novas oportunidades
              de negócio.
            </p>


            <span className="card-link">

              Ver orçamentos

            </span>

          </button>



          {/* PERFIL */}

          <button
            className="fornecedor-card"
            onClick={() =>
              navigate("/perfil-fornecedor")
            }
          >

            <div className="fornecedor-card-icone">

              🏢

            </div>


            <h3>
              Perfil da empresa
            </h3>


            <p>
              Atualize suas informações,
              descrição e dados de contato.
            </p>


            <span className="card-link">

              Editar perfil

            </span>

          </button>


        </section>



        {/* =========================================
            DICAS
        ========================================= */}

        <section className="dicas-fornecedor">


          <div className="dicas-texto">

            <span>
              ✦ DICA DO CELEBRA
            </span>


            <h2>
              Destaque sua empresa.
            </h2>


            <p>
              Mantenha seu perfil atualizado,
              adicione uma boa descrição dos seus
              serviços e facilite que novos clientes
              encontrem sua empresa.
            </p>

          </div>


          <button
            className="botao-dica"
            onClick={() =>
              navigate("/meus-servicos")
            }
          >
            Atualizar meus serviços
          </button>


        </section>


      </main>


      {/* =========================================
          FOOTER
      ========================================= */}

      <footer className="inicio-fornecedor-footer">

        <h2>
          Celebra
        </h2>


        <p>
          Conectando pessoas, profissionais
          e momentos especiais.
        </p>


        <span>
          © 2026 Celebra
        </span>

      </footer>


    </div>

  );

}