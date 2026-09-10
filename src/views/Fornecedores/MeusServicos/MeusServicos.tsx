import { useNavigate } from "react-router-dom";

import "./MeusServicos.css";


export default function MeusServicos() {

  const navigate = useNavigate();


  const servicos = [
    {
      id: 1,
      nome: "Fotografia",
      descricao:
        "Fotografia profissional para eventos, registrando momentos especiais com qualidade e criatividade.",
      preco: "A partir de R$ 1.500",
      icone: "📷",
      categoria: "FOTOGRAFIA",
      status: "Ativo",
    },
    {
      id: 2,
      nome: "Decoração",
      descricao:
        "Decoração personalizada para transformar seu evento em uma experiência única e especial.",
      preco: "A partir de R$ 2.000",
      icone: "✨",
      categoria: "DECORAÇÃO",
      status: "Ativo",
    },
  ];


  return (

    <div className="meus-servicos-page">


      {/* =========================================
          HEADER
      ========================================= */}

      <header className="meus-servicos-header">

        <div className="servicos-logo">

          <h1>
            Celebra
          </h1>

          <span>
            ✦
          </span>

        </div>


        <nav className="servicos-nav">

          <button
            onClick={() =>
              navigate("/inicio-fornecedor")
            }
          >
            Início
          </button>

          <button className="nav-ativo">
            Meus serviços
          </button>

        </nav>


        <button
          className="botao-voltar-header"
          onClick={() =>
            navigate("/inicio-fornecedor")
          }
        >
          Voltar
        </button>

      </header>



      {/* =========================================
          CONTEÚDO
      ========================================= */}

      <main className="meus-servicos-main">


        {/* =========================================
            HERO
        ========================================= */}

        <section className="servicos-hero">


          <div className="servicos-hero-texto">

            <span className="servicos-tag">
              ÁREA DO FORNECEDOR
            </span>


            <h2>
              Meus
              <br />

              <em>
                serviços.
              </em>
            </h2>


            <p>
              Gerencie os serviços oferecidos pela sua
              empresa e mantenha suas informações
              sempre atualizadas para alcançar mais clientes.
            </p>


            <button
              className="botao-cadastrar-servico"
              onClick={() =>
                navigate("/cadastrar-servico")
              }
            >
              + Cadastrar novo serviço
            </button>

          </div>



          {/* CARD RESUMO */}

          <div className="servicos-resumo-card">

            <span className="resumo-servicos-titulo">
              RESUMO
            </span>


            <div className="resumo-servico-item">

              <div className="resumo-servico-icone">
                📋
              </div>


              <div>

                <strong>
                  {servicos.length}
                </strong>

                <p>
                  Serviços cadastrados
                </p>

              </div>

            </div>


            <div className="resumo-servico-item">

              <div className="resumo-servico-icone">
                ✓
              </div>


              <div>

                <strong>
                  {servicos.filter(
                    (servico) =>
                      servico.status === "Ativo"
                  ).length}
                </strong>

                <p>
                  Serviços ativos
                </p>

              </div>

            </div>


            <div className="resumo-servico-item">

              <div className="resumo-servico-icone">
                ⭐
              </div>


              <div>

                <strong>
                  Perfil profissional
                </strong>

                <p>
                  Mantenha seus serviços atualizados
                </p>

              </div>

            </div>

          </div>


        </section>



        {/* =========================================
            TÍTULO DA LISTA
        ========================================= */}

        <section className="lista-servicos-topo">


          <div>

            <span>
              SEUS SERVIÇOS
            </span>


            <h2>
              Serviços cadastrados
            </h2>


            <p>
              Visualize e gerencie todos os serviços
              disponíveis em sua empresa.
            </p>

          </div>


          <div className="quantidade-servicos">

            <strong>
              {servicos.length}
            </strong>

            <span>
              serviço
              {servicos.length !== 1
                ? "s"
                : ""}
            </span>

          </div>


        </section>



        {/* =========================================
            LISTA VAZIA
        ========================================= */}

        {servicos.length === 0 ? (

          <section className="sem-servicos">

            <div className="sem-servicos-icone">
              📋
            </div>


            <h3>
              Nenhum serviço cadastrado
            </h3>


            <p>
              Cadastre seu primeiro serviço para
              começar a receber oportunidades
              através do Celebra.
            </p>


            <button
              onClick={() =>
                navigate("/cadastrar-servico")
              }
            >
              + Cadastrar meu primeiro serviço
            </button>

          </section>

        ) : (


          /* =========================================
              GRID DE SERVIÇOS
          ========================================= */

          <section className="servicos-lista">


            {servicos.map(
              (servico) => (

                <article
                  className="meu-servico-card"
                  key={servico.id}
                >


                  {/* TOPO */}

                  <div className="servico-card-topo">


                    <div className="servico-icone-grande">

                      {servico.icone}

                    </div>


                    <span className="status-servico">

                      ● {servico.status}

                    </span>


                  </div>



                  {/* CATEGORIA */}

                  <span className="categoria-servico">

                    {servico.categoria}

                  </span>



                  {/* NOME */}

                  <h3>

                    {servico.nome}

                  </h3>



                  {/* DESCRIÇÃO */}

                  <p className="descricao-servico">

                    {servico.descricao}

                  </p>



                  {/* PREÇO */}

                  <div className="preco-servico">

                    <span>
                      PREÇO
                    </span>


                    <strong>

                      {servico.preco}

                    </strong>

                  </div>



                  {/* AÇÕES */}

                  <div className="servico-acoes">


                    <button className="botao-editar">

                      ✏ Editar

                    </button>


                    <button className="botao-excluir">

                      🗑 Excluir

                    </button>


                  </div>


                </article>

              )
            )}


          </section>

        )}



        {/* =========================================
            DICA
        ========================================= */}

        <section className="dica-servicos">


          <div>

            <span>
              ✦ DICA DO CELEBRA
            </span>


            <h2>
              Serviços atualizados atraem mais clientes.
            </h2>


            <p>
              Adicione descrições detalhadas, informações
              atualizadas e preços claros para ajudar clientes
              a conhecer melhor o que sua empresa oferece.
            </p>

          </div>


          <button
            onClick={() =>
              navigate("/cadastrar-servico")
            }
          >
            Adicionar serviço
          </button>


        </section>


      </main>



      {/* =========================================
          FOOTER
      ========================================= */}

      <footer className="meus-servicos-footer">

        <h2>
          Celebra
        </h2>


        <p>
          Transformando eventos em momentos inesquecíveis.
        </p>


        <span>
          © 2026 Celebra
        </span>

      </footer>


    </div>

  );

}