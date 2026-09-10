import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  buscarMeusEventos,
} from "../../../controllers/eventoController";

import type { Evento } from "../../../models/Evento";

import "./PaginaInicial.css";


export default function PaginaInicial() {

  const navigate = useNavigate();

  const [eventos, setEventos] = useState<Evento[]>([]);

  const [eventoSelecionado, setEventoSelecionado] =
    useState<Evento | null>(null);

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

      if (dados.length > 0) {

        setEventoSelecionado(dados[0]);

      }

    } catch (error) {

      console.error(
        "Erro ao carregar eventos:",
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


  useEffect(() => {

    carregarEventos();

  }, []);


  // ==========================================
  // DATA
  // ==========================================

  function formatarData(data: string) {

    if (!data) {
      return "Data não informada";
    }

    const [ano, mes, dia] = data.split("-");

    if (!ano || !mes || !dia) {
      return data;
    }

    return `${dia}/${mes}/${ano}`;

  }


  // ==========================================
  // CONTAGEM REGRESSIVA
  // ==========================================

  function calcularDias(data: string) {

    if (!data) {
      return 0;
    }

    const hoje = new Date();

    hoje.setHours(0, 0, 0, 0);

    const evento = new Date(`${data}T00:00:00`);

    const diferenca =
      evento.getTime() - hoje.getTime();

    return Math.max(
      0,
      Math.ceil(
        diferenca / (1000 * 60 * 60 * 24)
      )
    );

  }


  // ==========================================
  // ORÇAMENTO
  // ==========================================

  function formatarMoeda(valor: number) {

    return valor.toLocaleString(
      "pt-BR",
      {
        style: "currency",
        currency: "BRL",
      }
    );

  }


  // ==========================================
  // CARREGANDO
  // ==========================================

  if (carregando) {

    return (

      <div className="dashboard-page">

        <div className="dashboard-loading">

          <div className="loading-icone">
            ✨
          </div>

          <h2>
            Carregando seu evento...
          </h2>

          <p>
            Estamos preparando seu painel.
          </p>

        </div>

      </div>

    );

  }


  // ==========================================
  // ERRO
  // ==========================================

  if (erro) {

    return (

      <div className="dashboard-page">

        <header className="dashboard-header">

          <div className="dashboard-logo">
            Celebra
          </div>

        </header>


        <main className="dashboard-main">

          <div className="dashboard-vazio">

            <div>
              ⚠️
            </div>

            <h2>
              Não conseguimos carregar seus eventos
            </h2>

            <p>
              {erro}
            </p>

            <button
              onClick={carregarEventos}
              className="dashboard-botao-principal"
            >
              Tentar novamente
            </button>

          </div>

        </main>

      </div>

    );

  }


  // ==========================================
  // SEM EVENTOS
  // ==========================================

  if (eventos.length === 0) {

    return (

      <div className="dashboard-page">

        <header className="dashboard-header">

          <div className="dashboard-logo">
            Celebra
          </div>

        </header>


        <main className="dashboard-main">

          <div className="dashboard-sem-evento">

            <div className="sem-evento-icone">
              ✨
            </div>

            <span>
              BEM-VINDO AO CELEBRA
            </span>

            <h1>
              Vamos começar a planejar?
            </h1>

            <p>
              Crie seu primeiro evento e tenha
              tudo organizado em um só lugar.
            </p>

            <button
              className="dashboard-botao-principal"
              onClick={() =>
                navigate("/montar-evento")
              }
            >
              Planejar meu evento →
            </button>

          </div>

        </main>

      </div>

    );

  }


  const evento = eventoSelecionado!;

  const diasRestantes =
    calcularDias(evento.data_evento);


  return (

    <div className="dashboard-page">


      {/* =====================================
          HEADER
      ===================================== */}

      <header className="dashboard-header">


        <div className="dashboard-logo">
          Celebra
        </div>


        <nav className="dashboard-nav">

          <button
            className="nav-ativo"
            onClick={() =>
              navigate("/inicio")
            }
          >
            Início
          </button>


          <button
            onClick={() =>
              navigate("/meus-eventos-cliente")
            }
          >
            Meus eventos
          </button>


          <button
            onClick={() =>
              navigate("/selecionar-servicos")
            }
          >
            Fornecedores
          </button>

        </nav>


        <button
          className="dashboard-perfil"
          onClick={() =>
            navigate("/perfil")
          }
        >
          👤
        </button>

      </header>


      {/* =====================================
          MAIN
      ===================================== */}

      <main className="dashboard-main">


        {/* =====================================
            TOPO
        ===================================== */}

        <section className="dashboard-boas-vindas">

          <div>

            <span>
              SEU PAINEL DE EVENTO
            </span>

            <h1>
              Olá! Vamos continuar?
            </h1>

            <p>
              Acompanhe todos os detalhes do seu
              evento em um só lugar.
            </p>

          </div>


          <button
            className="dashboard-criar"
            onClick={() =>
              navigate("/montar-evento")
            }
          >
            + Novo evento
          </button>

        </section>


        {/* =====================================
            SELETOR DE EVENTOS
        ===================================== */}

        {eventos.length > 1 && (

          <section className="seletor-evento">

            <label>
              Evento atual
            </label>


            <select
              value={evento.id_evento}
              onChange={(e) => {

                const selecionado =
                  eventos.find(
                    (item) =>
                      item.id_evento ===
                      Number(e.target.value)
                  );

                if (selecionado) {

                  setEventoSelecionado(
                    selecionado
                  );

                }

              }}
            >

              {eventos.map(
                (item) => (

                  <option
                    key={item.id_evento}
                    value={item.id_evento}
                  >
                    {item.nome}
                  </option>

                )
              )}

            </select>

          </section>

        )}


        {/* =====================================
            EVENTO PRINCIPAL
        ===================================== */}

        <section className="evento-destaque">


          <div className="evento-destaque-conteudo">


            <div className="evento-tag">

              {evento.tipo_evento}

            </div>


            <h2>
              {evento.nome}
            </h2>


            <div className="evento-informacoes">


              <span>
                📅 {formatarData(
                  evento.data_evento
                )}
              </span>


              {evento.horario && (

                <span>
                  🕐 {evento.horario}
                </span>

              )}


              {evento.local && (

                <span>
                  📍 {evento.local}
                </span>

              )}


              <span>
                👥 {evento.qtd_convidados}
                {" "}convidados
              </span>

            </div>


            <button
              className="evento-destaque-botao"
              onClick={() =>
                navigate(
                  `/evento/${evento.id_evento}`
                )
              }
            >
              Continuar planejando →
            </button>

          </div>


          <div className="contador-evento">

            <span>
              FALTAM
            </span>


            <strong>
              {diasRestantes}
            </strong>


            <small>
              {diasRestantes === 1
                ? "dia"
                : "dias"
              }
            </small>

          </div>

        </section>


        {/* =====================================
            RESUMO
        ===================================== */}

        <section className="dashboard-resumo">


          <article className="resumo-dashboard-card">

            <div className="resumo-icone">
              💰
            </div>

            <span>
              Orçamento
            </span>

            <strong>
              {formatarMoeda(
                evento.orcamento
              )}
            </strong>

            <small>
              orçamento definido
            </small>

          </article>


          <article className="resumo-dashboard-card">

            <div className="resumo-icone">
              👥
            </div>

            <span>
              Convidados
            </span>

            <strong>
              {evento.qtd_convidados}
            </strong>

            <small>
              pessoas previstas
            </small>

          </article>


          <article className="resumo-dashboard-card">

            <div className="resumo-icone">
              ✓
            </div>

            <span>
              Checklist
            </span>

            <strong>
              0%
            </strong>

            <small>
              ainda não iniciado
            </small>

          </article>


          <article className="resumo-dashboard-card">

            <div className="resumo-icone">
              🛍
            </div>

            <span>
              Serviços
            </span>

            <strong>
              —
            </strong>

            <small>
              nenhum serviço registrado
            </small>

          </article>


        </section>


        {/* =====================================
            COLUNAS
        ===================================== */}

        <section className="dashboard-grid">


          {/* ===================================
              ORÇAMENTO
          =================================== */}

          <article className="dashboard-card">

            <div className="card-titulo">

              <div>

                <span>
                  CONTROLE FINANCEIRO
                </span>

                <h2>
                  Seu orçamento
                </h2>

              </div>


              <div className="card-icone">
                💰
              </div>

            </div>


            <div className="orcamento-principal">

              <strong>
                {formatarMoeda(
                  evento.orcamento
                )}
              </strong>

              <span>
                orçamento disponível
              </span>

            </div>


            <div className="barra-orcamento">

              <div />

            </div>


            <div className="orcamento-legenda">

              <span>
                R$ 0 utilizados
              </span>

              <span>
                {formatarMoeda(
                  evento.orcamento
                )}
              </span>

            </div>


            <button
              className="card-link"
              onClick={() =>
                navigate("/orcamento")
              }
            >
              Ver controle financeiro →
            </button>

          </article>


          {/* ===================================
              CHECKLIST
          =================================== */}

          <article className="dashboard-card">

            <div className="card-titulo">

              <div>

                <span>
                  ORGANIZAÇÃO
                </span>

                <h2>
                  Checklist
                </h2>

              </div>


              <div className="card-icone">
                ✓
              </div>

            </div>


            <div className="checklist">

              <div className="checklist-item">

                <span className="check-box">
                  ○
                </span>

                <span>
                  Definir local do evento
                </span>

              </div>


              <div className="checklist-item">

                <span className="check-box">
                  ○
                </span>

                <span>
                  Escolher fornecedores
                </span>

              </div>


              <div className="checklist-item">

                <span className="check-box">
                  ○
                </span>

                <span>
                  Organizar convidados
                </span>

              </div>


              <div className="checklist-item">

                <span className="check-box">
                  ○
                </span>

                <span>
                  Enviar convites
                </span>

              </div>

            </div>


            <button
              className="card-link"
              onClick={() =>
                navigate("/checklist")
              }
            >
              Ver checklist completo →
            </button>

          </article>


          {/* ===================================
              PRÓXIMOS PASSOS
          =================================== */}

          <article className="dashboard-card">

            <div className="card-titulo">

              <div>

                <span>
                  PLANEJAMENTO
                </span>

                <h2>
                  Próximos passos
                </h2>

              </div>


              <div className="card-icone">
                ⚡
              </div>

            </div>


            <div className="proximos-passos">


              <div className="passo-item">

                <div className="passo-numero">
                  1
                </div>

                <div>

                  <strong>
                    Escolha seus fornecedores
                  </strong>

                  <p>
                    Encontre profissionais para
                    o seu evento.
                  </p>

                </div>

              </div>


              <div className="passo-item">

                <div className="passo-numero">
                  2
                </div>

                <div>

                  <strong>
                    Organize seus convidados
                  </strong>

                  <p>
                    Monte sua lista de convidados.
                  </p>

                </div>

              </div>


              <div className="passo-item">

                <div className="passo-numero">
                  3
                </div>

                <div>

                  <strong>
                    Complete seu checklist
                  </strong>

                  <p>
                    Não esqueça nenhum detalhe.
                  </p>

                </div>

              </div>


            </div>

          </article>


          {/* ===================================
              EVENTO
          =================================== */}

          <article className="dashboard-card">

            <div className="card-titulo">

              <div>

                <span>
                  DETALHES
                </span>

                <h2>
                  Sobre o evento
                </h2>

              </div>


              <div className="card-icone">
                ✨
              </div>

            </div>


            <div className="detalhes-dashboard">


              <div>

                <span>
                  Tema
                </span>

                <strong>
                  {evento.tema ||
                    "Ainda não definido"}
                </strong>

              </div>


              <div>

                <span>
                  Data
                </span>

                <strong>
                  {formatarData(
                    evento.data_evento
                  )}
                </strong>

              </div>


              <div>

                <span>
                  Local
                </span>

                <strong>
                  {evento.local ||
                    "Ainda não definido"}
                </strong>

              </div>


              <div>

                <span>
                  Status
                </span>

                <strong>
                  {evento.status ||
                    "Em planejamento"}
                </strong>

              </div>


            </div>


            <button
              className="card-link"
              onClick={() =>
                navigate(
                  `/evento/${evento.id_evento}`
                )
              }
            >
              Editar detalhes do evento →
            </button>

          </article>


        </section>


        {/* =====================================
            CTA
        ===================================== */}

        <section className="dashboard-final">

          <div>

            <span>
              ✦ CELEBRE CADA DETALHE
            </span>

            <h2>
              Seu evento, do seu jeito.
            </h2>

            <p>
              Continue planejando e deixe o
              Celebra cuidar da organização.
            </p>

          </div>


          <button
            onClick={() =>
              navigate(
                "/selecionar-servicos"
              )
            }
          >
            Encontrar fornecedores →
          </button>

        </section>


      </main>

    </div>

  );

}