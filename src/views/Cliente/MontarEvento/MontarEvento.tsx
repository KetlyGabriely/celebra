import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { criarNovoEvento } from "../../../controllers/eventoController";

import "./MontarEvento.css";


interface LocationState {
  tipoEvento?: string;
}


export default function MontarEvento() {

  const navigate = useNavigate();
  const location = useLocation();

  const state = location.state as LocationState | null;


  // ==========================================
  // DADOS DO EVENTO
  // ==========================================

  const [nome, setNome] = useState("");

  const [tipoEvento, setTipoEvento] = useState(
    state?.tipoEvento || ""
  );

  const [tema, setTema] = useState("");

  const [dataEvento, setDataEvento] = useState("");

  const [horario, setHorario] = useState("");

  const [local, setLocal] = useState("");


  // ==========================================
  // ORÇAMENTO E CONVIDADOS
  // ==========================================

  const [orcamento, setOrcamento] = useState(15000);

  const [convidados, setConvidados] = useState(100);


  // ==========================================
  // CONTROLE
  // ==========================================

  const [carregando, setCarregando] = useState(false);


  // ==========================================
  // CONVIDADOS
  // ==========================================

  function aumentarConvidados() {

    setConvidados((valorAtual) => valorAtual + 1);

  }


  function diminuirConvidados() {

    setConvidados((valorAtual) => {

      if (valorAtual > 1) {
        return valorAtual - 1;
      }

      return valorAtual;

    });

  }


  // ==========================================
  // SALVAR EVENTO
  // ==========================================

  async function continuar() {

    // ------------------------------
    // VALIDAÇÕES
    // ------------------------------

    if (!nome.trim()) {

      alert("Informe o nome do evento.");

      return;

    }


    if (!tipoEvento) {

      alert("Selecione o tipo do evento.");

      return;

    }


    if (!dataEvento) {

      alert("Informe a data do evento.");

      return;

    }


    if (orcamento <= 0) {

      alert("Informe um orçamento maior que zero.");

      return;

    }


    try {

      setCarregando(true);


      // ------------------------------
      // CRIAR EVENTO
      // ------------------------------

      const eventoCriado = await criarNovoEvento({

        nome: nome.trim(),

        tipo_evento: tipoEvento,

        tema: tema.trim(),

        data_evento: dataEvento,

        horario: horario || undefined,

        local: local.trim() || undefined,

        qtd_convidados: convidados,

        orcamento: orcamento,

        status: "EM_PLANEJAMENTO",

      });


      console.log(
        "Evento criado:",
        eventoCriado
      );


      // ------------------------------
      // IR PARA SERVIÇOS
      // ------------------------------

      navigate(
        "/selecionar-servicos",
        {
          state: {

            idEvento: eventoCriado.id_evento,

            nome: nome.trim(),

            tipoEvento,

            tema: tema.trim(),

            dataEvento,

            horario,

            local,

            convidados,

            orcamento,

          },
        }
      );


    } catch (error) {

      console.error(
        "Erro ao criar evento:",
        error
      );


      if (error instanceof Error) {

        alert(
          `Não foi possível criar o evento:\n${error.message}`
        );

      } else {

        alert(
          "Não foi possível criar o evento."
        );

      }


    } finally {

      setCarregando(false);

    }

  }


  // ==========================================
  // INTERFACE
  // ==========================================

  return (

    <div className="montar-evento">


      {/* ==================================
          HEADER
      ================================== */}

      <header className="montar-header">

        <h1>
          Celebra
        </h1>


        <button
          className="voltar-header"
          onClick={() => navigate(-1)}
          type="button"
        >
          ← Voltar
        </button>

      </header>


      {/* ==================================
          CONTEÚDO
      ================================== */}

      <main className="montar-main">


        <div className="montar-titulo">

          <span>
            PLANEJE SEU EVENTO
          </span>


          <h2>
            Conte-nos mais sobre o evento
          </h2>


          <p>
            Defina as principais informações da sua festa
            para começarmos o planejamento.
          </p>

        </div>


        {/* ==================================
            INFORMAÇÕES DO EVENTO
        ================================== */}

        <div className="montar-grid">


          {/* NOME */}

          <section className="evento-config-card">

            <h3>
              ✨ NOME DO EVENTO
            </h3>


            <input
              type="text"
              placeholder="Ex.: Casamento de Ana e Lucas"
              value={nome}
              onChange={(e) =>
                setNome(e.target.value)
              }
            />

          </section>


          {/* TIPO */}

          <section className="evento-config-card">

            <h3>
              🎉 TIPO DO EVENTO
            </h3>


            <select
              value={tipoEvento}
              onChange={(e) =>
                setTipoEvento(e.target.value)
              }
            >

              <option value="">
                Selecione o tipo
              </option>

              <option value="Casamento">
                Casamento
              </option>

              <option value="Aniversário">
                Aniversário
              </option>

              <option value="Formatura">
                Formatura
              </option>

              <option value="Festa">
                Festa
              </option>

              <option value="Corporativo">
                Evento corporativo
              </option>

              <option value="Outro">
                Outro
              </option>

            </select>

          </section>


          {/* TEMA */}

          <section className="evento-config-card">

            <h3>
              🎨 TEMA
            </h3>


            <input
              type="text"
              placeholder="Ex.: Elegante, floral, moderno..."
              value={tema}
              onChange={(e) =>
                setTema(e.target.value)
              }
            />

          </section>


          {/* DATA */}

          <section className="evento-config-card">

            <h3>
              📅 DATA DO EVENTO
            </h3>


            <input
              className="input-data"
              type="date"
              value={dataEvento}
              onChange={(e) =>
                setDataEvento(e.target.value)
              }
            />


            <p>
              A data será utilizada para verificar
              a disponibilidade dos fornecedores.
            </p>

          </section>


          {/* HORÁRIO */}

          <section className="evento-config-card">

            <h3>
              🕐 HORÁRIO
            </h3>


            <input
              type="time"
              value={horario}
              onChange={(e) =>
                setHorario(e.target.value)
              }
            />

          </section>


          {/* LOCAL */}

          <section className="evento-config-card">

            <h3>
              📍 LOCAL
            </h3>


            <input
              type="text"
              placeholder="Ex.: Espaço Celebra, Itapetininga"
              value={local}
              onChange={(e) =>
                setLocal(e.target.value)
              }
            />

          </section>


          {/* ==================================
              ORÇAMENTO
          ================================== */}

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


          {/* ==================================
              CONVIDADOS
          ================================== */}

          <section className="evento-config-card">

            <h3>
              👥 NÚMERO DE CONVIDADOS
            </h3>


            <div className="controle-convidados">


              <button
                type="button"
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
                type="button"
                onClick={aumentarConvidados}
              >
                +
              </button>


            </div>


            <div className="opcoes-convidados">

              <button
                type="button"
                onClick={() =>
                  setConvidados(30)
                }
              >
                30
              </button>


              <button
                type="button"
                onClick={() =>
                  setConvidados(80)
                }
              >
                80
              </button>


              <button
                type="button"
                onClick={() =>
                  setConvidados(150)
                }
              >
                150
              </button>


              <button
                type="button"
                onClick={() =>
                  setConvidados(300)
                }
              >
                300
              </button>

            </div>

          </section>


        </div>


        {/* ==================================
            BOTÕES
        ================================== */}

        <div className="montar-botoes">


          <button
            className="botao-voltar"
            type="button"
            onClick={() => navigate(-1)}
          >
            Voltar
          </button>


          <button
            className="botao-continuar"
            type="button"
            onClick={continuar}
            disabled={carregando}
          >

            {carregando
              ? "Salvando..."
              : "Continuar →"
            }

          </button>


        </div>


      </main>

    </div>

  );

}