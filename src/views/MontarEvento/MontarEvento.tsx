import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./MontarEvento.css";


export default function MontarEvento() {

  const navigate = useNavigate();

  const [orcamento, setOrcamento] =
    useState(15000);

  const [convidados, setConvidados] =
    useState(100);

  const [dataEvento, setDataEvento] =
    useState("");


  function aumentarConvidados() {

    setConvidados(
      convidados + 1
    );

  }


  function diminuirConvidados() {

    if (convidados > 1) {

      setConvidados(
        convidados - 1
      );

    }

  }


  function continuar() {

    if (!dataEvento) {

      alert(
        "Informe a data do evento."
      );

      return;

    }


    navigate(
      "/selecionar-servicos",
      {
        state: {
          orcamento,
          convidados,
          dataEvento,
        },
      }
    );

  }


  return (

    <div className="montar-evento">

      {/* HEADER */}

      <header className="montar-header">

        <h1>
          Celebra
        </h1>


        <button
          className="voltar-header"
          onClick={() =>
            navigate("/inicio")
          }
        >
          Voltar
        </button>

      </header>


      {/* CONTEÚDO */}

      <main className="montar-main">

        <div className="montar-titulo">

          <span>
            PLANEJE SEU EVENTO
          </span>


          <h2>
            Conte-nos mais sobre o evento
          </h2>


          <p>
            Defina seu orçamento, número de convidados
            e a data do seu evento.
          </p>

        </div>


        <div className="montar-grid">


          {/* ORÇAMENTO */}

          <section className="evento-config-card">

            <h3>
              💰 ORÇAMENTO TOTAL
            </h3>


            <h2 className="valor-orcamento">

              R$ {orcamento.toLocaleString(
                "pt-BR"
              )}

            </h2>


            <input
              className="range-orcamento"
              type="range"
              min="0"
              max="100000"
              step="500"
              value={orcamento}
              onChange={(e) =>
                setOrcamento(
                  Number(e.target.value)
                )
              }
            />


            <div className="range-valores">

              <span>
                R$ 0
              </span>


              <span>
                R$ 100.000
              </span>

            </div>

          </section>


          {/* CONVIDADOS */}

          <section className="evento-config-card">

            <h3>
              👥 NÚMERO DE CONVIDADOS
            </h3>


            <div className="controle-convidados">

              <button
                onClick={diminuirConvidados}
              >
                −
              </button>


              <div>

                <strong>
                  {convidados}
                </strong>

                <span>
                  Pessoas
                </span>

              </div>


              <button
                onClick={aumentarConvidados}
              >
                +
              </button>

            </div>


            <div className="opcoes-convidados">

              <button
                onClick={() =>
                  setConvidados(30)
                }
              >
                30
              </button>


              <button
                onClick={() =>
                  setConvidados(80)
                }
              >
                80
              </button>


              <button
                onClick={() =>
                  setConvidados(150)
                }
              >
                150
              </button>


              <button
                onClick={() =>
                  setConvidados(300)
                }
              >
                300
              </button>

            </div>

          </section>


          {/* DATA */}

          <section className="evento-config-card data-card">

            <h3>
              📅 DATA DO EVENTO
            </h3>


            <input
              className="input-data"
              type="date"
              value={dataEvento}
              onChange={(e) =>
                setDataEvento(
                  e.target.value
                )
              }
            />


            <p>
              A data será utilizada para verificar
              a disponibilidade dos espaços e profissionais.
            </p>

          </section>


        </div>


        {/* BOTÕES */}

        <div className="montar-botoes">

          <button
            className="botao-voltar"
            onClick={() =>
              navigate("/inicio")
            }
          >
            Voltar
          </button>


          <button
            className="botao-continuar"
            onClick={continuar}
          >
            Continuar
          </button>

        </div>

      </main>

    </div>

  );

}