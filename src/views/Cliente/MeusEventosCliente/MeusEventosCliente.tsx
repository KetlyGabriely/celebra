import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  buscarMeusEventos,
  excluirMeuEvento,
} from "../../../controllers/eventoController";

import type { Evento } from "../../../models/Evento";

import "./MeusEventosCliente.css";


export default function MeusEventosCliente() {

  const navigate = useNavigate();


  // ==========================================
  // ESTADOS
  // ==========================================

  const [eventos, setEventos] = useState<Evento[]>([]);

  const [carregando, setCarregando] = useState(true);

  const [erro, setErro] = useState("");


  // ==========================================
  // BUSCAR EVENTOS
  // ==========================================

  async function carregarEventos() {

    try {

      setCarregando(true);

      setErro("");

      const dados = await buscarMeusEventos();

      setEventos(dados);

    } catch (error) {

      console.error(
        "Erro ao buscar eventos:",
        error
      );

      if (error instanceof Error) {

        setErro(error.message);

      } else {

        setErro(
          "Não foi possível carregar seus eventos."
        );

      }

    } finally {

      setCarregando(false);

    }

  }


  // ==========================================
  // CARREGAR AO ABRIR A PÁGINA
  // ==========================================

  useEffect(() => {

    carregarEventos();

  }, []);


  // ==========================================
  // FORMATAR DATA
  // ==========================================

  function formatarData(
    data: string
  ) {

    if (!data) {
      return "Data não informada";
    }

    const [ano, mes, dia] =
      data.split("-");

    if (!ano || !mes || !dia) {
      return data;
    }

    return `${dia}/${mes}/${ano}`;

  }


  // ==========================================
  // FORMATAR DINHEIRO
  // ==========================================

  function formatarValor(
    valor: number
  ) {

    return valor.toLocaleString(
      "pt-BR",
      {
        style: "currency",
        currency: "BRL",
      }
    );

  }


  // ==========================================
  // STATUS
  // ==========================================

  function textoStatus(
    status?: string
  ) {

    switch (status) {

      case "EM_PLANEJAMENTO":
        return "Em planejamento";

      case "CONFIRMADO":
        return "Confirmado";

      case "CANCELADO":
        return "Cancelado";

      default:
        return status || "Em planejamento";

    }

  }


  // ==========================================
  // EXCLUIR EVENTO
  // ==========================================

  async function excluirEvento(
    idEvento?: number
  ) {

    if (!idEvento) {
      return;
    }


    const confirmar =
      window.confirm(
        "Tem certeza que deseja excluir este evento?"
      );


    if (!confirmar) {
      return;
    }


    try {

      await excluirMeuEvento(idEvento);

      setEventos((eventosAtuais) =>
        eventosAtuais.filter(
          (evento) =>
            evento.id_evento !== idEvento
        )
      );

    } catch (error) {

      console.error(
        "Erro ao excluir evento:",
        error
      );

      if (error instanceof Error) {

        alert(
          `Não foi possível excluir o evento:\n${error.message}`
        );

      } else {

        alert(
          "Não foi possível excluir o evento."
        );

      }

    }

  }


  // ==========================================
  // CARREGANDO
  // ==========================================

  if (carregando) {

    return (

      <div className="meus-eventos-cliente-page">

        <header className="meus-eventos-cliente-header">

          <button
            className="logo-celebra"
            onClick={() =>
              navigate("/dashboard")
            }
          >
            Celebra
          </button>

        </header>


        <main className="meus-eventos-cliente-main">

          <div className="estado-eventos">

            <div className="estado-icone">
              ⏳
            </div>

            <h2>
              Carregando seus eventos...
            </h2>

            <p>
              Estamos buscando seus eventos.
            </p>

          </div>

        </main>

      </div>

    );

  }


  // ==========================================
  // ERRO
  // ==========================================

  if (erro) {

    return (

      <div className="meus-eventos-cliente-page">

        <header className="meus-eventos-cliente-header">

          <button
            className="logo-celebra"
            onClick={() =>
              navigate("/dashboard")
            }
          >
            Celebra
          </button>


          <button
            className="botao-voltar"
            onClick={() =>
              navigate("/dashboard")
            }
          >
            ← Voltar
          </button>

        </header>


        <main className="meus-eventos-cliente-main">

          <div className="estado-eventos">

            <div className="estado-icone">
              ⚠️
            </div>

            <h2>
              Não foi possível carregar os eventos
            </h2>

            <p>
              {erro}
            </p>


            <button
              className="botao-principal"
              onClick={carregarEventos}
            >
              Tentar novamente
            </button>

          </div>

        </main>

      </div>

    );

  }


  // ==========================================
  // INTERFACE
  // ==========================================

  return (

    <div className="meus-eventos-cliente-page">


      {/* =====================================
          HEADER
      ===================================== */}

      <header className="meus-eventos-cliente-header">

        <button
          className="logo-celebra"
          onClick={() =>
            navigate("/dashboard")
          }
        >
          Celebra
        </button>


        <button
          className="botao-voltar"
          onClick={() =>
            navigate("/dashboard")
          }
        >
          ← Início
        </button>

      </header>


      {/* =====================================
          CONTEÚDO
      ===================================== */}

      <main className="meus-eventos-cliente-main">


        {/* =====================================
            TOPO
        ===================================== */}

        <section className="meus-eventos-intro">

          <div>

            <span className="tag-eventos">
              MEUS EVENTOS
            </span>


            <h1>
              Seus eventos em um só lugar
            </h1>


            <p>
              Acompanhe e organize todos os eventos
              que você está planejando no Celebra.
            </p>

          </div>


          <button
            className="botao-criar-evento"
            onClick={() =>
              navigate("/montar-evento")
            }
          >
            + Criar novo evento
          </button>

        </section>


        {/* =====================================
            RESUMO
        ===================================== */}

        <section className="resumo-eventos">

          <div className="resumo-card">

            <span>
              Eventos
            </span>

            <strong>
              {eventos.length}
            </strong>

          </div>


          <div className="resumo-card">

            <span>
              Em planejamento
            </span>

            <strong>

              {
                eventos.filter(
                  (evento) =>
                    evento.status ===
                    "EM_PLANEJAMENTO"
                ).length
              }

            </strong>

          </div>


          <div className="resumo-card">

            <span>
              Confirmados
            </span>

            <strong>

              {
                eventos.filter(
                  (evento) =>
                    evento.status ===
                    "CONFIRMADO"
                ).length
              }

            </strong>

          </div>

        </section>


        {/* =====================================
            LISTA
        ===================================== */}

        {eventos.length === 0 ? (

          <section className="estado-eventos">

            <div className="estado-icone">
              ✨
            </div>


            <h2>
              Você ainda não possui eventos
            </h2>


            <p>
              Comece planejando seu primeiro evento
              com o Celebra.
            </p>


            <button
              className="botao-principal"
              onClick={() =>
                navigate("/montar-evento")
              }
            >
              Planejar meu evento →
            </button>

          </section>

        ) : (

          <section className="lista-meus-eventos">

            {eventos.map(
              (evento) => (

                <article
                  className="card-meu-evento"
                  key={evento.id_evento}
                >


                  {/* ÍCONE */}

                  <div className="icone-evento">
                    📅
                  </div>


                  {/* INFORMAÇÕES */}

                  <div className="informacoes-evento">

                    <div className="evento-linha-topo">

                      <span className="tipo-evento">
                        {evento.tipo_evento}
                      </span>


                      <span
                        className={`status-evento ${
                          evento.status ===
                          "CONFIRMADO"
                            ? "status-confirmado"
                            : evento.status ===
                              "CANCELADO"
                            ? "status-cancelado"
                            : ""
                        }`}
                      >
                        {textoStatus(
                          evento.status
                        )}
                      </span>

                    </div>


                    <h2>
                      {evento.nome}
                    </h2>


                    {evento.tema && (

                      <p className="tema-evento">
                        Tema: {evento.tema}
                      </p>

                    )}


                    <div className="detalhes-evento">

                      <span>
                        📅{" "}
                        {formatarData(
                          evento.data_evento
                        )}
                      </span>


                      {evento.horario && (

                        <span>
                          🕐 {evento.horario}
                        </span>

                      )}


                      <span>
                        👥{" "}
                        {evento.qtd_convidados}
                        {" "}convidados
                      </span>


                      {evento.local && (

                        <span>
                          📍 {evento.local}
                        </span>

                      )}

                    </div>


                    <div className="orcamento-evento">

                      <span>
                        Orçamento
                      </span>

                      <strong>
                        {formatarValor(
                          evento.orcamento
                        )}
                      </strong>

                    </div>

                  </div>


                  {/* AÇÕES */}

                  <div className="acoes-evento">

                    <button
                      className="botao-ver-evento"
                      onClick={() =>
                        navigate(
                          `/evento/${evento.id_evento}`
                        )
                      }
                    >
                      Ver evento →
                    </button>


                    <button
                      className="botao-excluir-evento"
                      onClick={() =>
                        excluirEvento(
                          evento.id_evento
                        )
                      }
                    >
                      Excluir
                    </button>

                  </div>

                </article>

              )
            )}

          </section>

        )}

      </main>

    </div>

  );

}