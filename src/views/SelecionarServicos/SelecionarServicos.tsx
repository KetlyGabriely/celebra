import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./SelecionarServicos.css";


const servicosDisponiveis = [
  {
    id: "FOTOGRAFIA",
    nome: "Fotografia",
    preco: "R$ 1.500 - R$ 8.000",
    icone: "📷",
  },
  {
    id: "GASTRONOMIA",
    nome: "Gastronomia",
    preco: "R$ 80 - R$ 300 / pessoa",
    icone: "🍽️",
  },
  {
    id: "FLORICULTURA",
    nome: "Floricultura",
    preco: "R$ 500 - R$ 5.000",
    icone: "🌷",
  },
  {
    id: "MUSICA",
    nome: "Música",
    preco: "R$ 1.500 - R$ 8.000",
    icone: "🎵",
  },
  {
    id: "DECORACAO",
    nome: "Decoração",
    preco: "R$ 1.000 - R$ 15.000",
    icone: "✨",
  },
  {
    id: "TRANSPORTE",
    nome: "Transporte",
    preco: "R$ 400 - R$ 2.500",
    icone: "🚗",
  },
];


export default function SelecionarServicos() {

  const navigate = useNavigate();

  const [servicosSelecionados, setServicosSelecionados] =
    useState<string[]>([]);


  function selecionarServico(id: string) {

    if (servicosSelecionados.includes(id)) {

      setServicosSelecionados(
        servicosSelecionados.filter(
          (servico) => servico !== id
        )
      );

    } else {

      setServicosSelecionados([
        ...servicosSelecionados,
        id,
      ]);

    }

  }


  function continuar() {

    if (servicosSelecionados.length === 0) {

      alert(
        "Selecione pelo menos um serviço."
      );

      return;

    }

    navigate(
      "/resultados",
      {
        state: {
          servicosSelecionados,
        },
      }
    );

  }


  return (

    <div className="selecionar-servicos">

      {/* HEADER */}

      <header className="servicos-header">

        <h1>
          Celebra
        </h1>


        <button
          onClick={() =>
            navigate("/inicio")
          }
        >
            Início
        </button>

      </header>


      {/* CONTEÚDO */}

      <main className="servicos-main">


        <div className="servicos-titulo">

          <span>
            PERSONALIZE SEU EVENTO
          </span>


          <h2>
            Quais serviços você precisa?
          </h2>


          <p>
            Selecione os serviços desejados para
            encontrarmos os melhores profissionais
            para o seu evento.
          </p>

        </div>


        {/* QUANTIDADE SELECIONADA */}

        <div className="contador-servicos">

          <strong>
            {servicosSelecionados.length}
          </strong>

          <span>
            serviço
            {servicosSelecionados.length !== 1
              ? "s selecionados"
              : " selecionado"}
          </span>

        </div>


        {/* CARDS */}

        <div className="servicos-grid">

          {servicosDisponiveis.map(
            (servico) => {

              const selecionado =
                servicosSelecionados.includes(
                  servico.id
                );


              return (

                <button
                  key={servico.id}
                  className={
                    selecionado
                      ? "servico-card selecionado"
                      : "servico-card"
                  }
                  onClick={() =>
                    selecionarServico(
                      servico.id
                    )
                  }
                >

                  <div className="servico-icone">
                    {servico.icone}
                  </div>


                  <h3>
                    {servico.nome}
                  </h3>


                  <p>
                    {servico.preco}
                  </p>


                  {selecionado && (

                    <div className="servico-selecionado">

                      ✓ Selecionado

                    </div>

                  )}

                </button>

              );

            }
          )}

        </div>


        {/* BOTÕES */}

        <div className="servicos-botoes">

          <button
            className="botao-voltar-servicos"
            onClick={() =>
              navigate("/montar-evento")
            }
          >
            Voltar
          </button>


          <button
            className="botao-continuar-servicos"
            onClick={continuar}
          >
            Continuar
          </button>

        </div>

      </main>

    </div>

  );

}