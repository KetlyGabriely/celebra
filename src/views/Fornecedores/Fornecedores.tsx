import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import "./Fornecedores.css";


const fornecedores = [

  {
    id: 1,
    nome: "Studio Momentos",
    categoria: "FOTOGRAFIA",
    descricao:
      "Fotografia profissional para casamentos, aniversários e eventos especiais.",

    cidade: "São Paulo",

    preco: "A partir de R$ 1.500",

    avaliacao: "4.9",

    icone: "📷",
  },

  {
    id: 2,
    nome: "Sabor & Arte",

    categoria: "GASTRONOMIA",

    descricao:
      "Buffet completo e experiências gastronômicas para todos os tipos de eventos.",

    cidade: "São Paulo",

    preco: "A partir de R$ 80 por pessoa",

    avaliacao: "4.8",

    icone: "🍽️",
  },

  {
    id: 3,
    nome: "Flores & Encantos",

    categoria: "FLORICULTURA",

    descricao:
      "Arranjos florais e decoração personalizada para momentos especiais.",

    cidade: "São Paulo",

    preco: "A partir de R$ 500",

    avaliacao: "4.9",

    icone: "🌷",
  },

  {
    id: 4,
    nome: "Som & Emoção",

    categoria: "MUSICA",

    descricao:
      "Música ao vivo, DJs e experiências musicais para seu evento.",

    cidade: "São Paulo",

    preco: "A partir de R$ 1.500",

    avaliacao: "4.7",

    icone: "🎵",
  },

  {
    id: 5,
    nome: "Celebre Decor",

    categoria: "DECORACAO",

    descricao:
      "Decoração exclusiva e personalizada para transformar seu evento.",

    cidade: "São Paulo",

    preco: "A partir de R$ 1.000",

    avaliacao: "4.9",

    icone: "✨",
  },

  {
    id: 6,
    nome: "Move Eventos",

    categoria: "TRANSPORTE",

    descricao:
      "Transporte confortável e seguro para convidados e eventos.",

    cidade: "São Paulo",

    preco: "A partir de R$ 400",

    avaliacao: "4.6",

    icone: "🚗",
  },

];


export default function Fornecedores() {

  const navigate = useNavigate();

  const location = useLocation();


  const {
    servicosSelecionados,
  } = location.state || {};


  const fornecedoresFiltrados =
    servicosSelecionados
      ? fornecedores.filter(

          (fornecedor) =>

            servicosSelecionados.includes(
              fornecedor.categoria
            )

        )

      : fornecedores;


  return (

    <div className="fornecedores-page">


      {/* HEADER */}

      <header className="fornecedores-header">

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

      <main className="fornecedores-main">


        {/* TÍTULO */}

        <div className="fornecedores-titulo">

          <span>
            PROFISSIONAIS PARA O SEU EVENTO
          </span>


          <h2>
            Encontre os fornecedores ideais
          </h2>


          <p>
            Selecionamos profissionais compatíveis
            com os serviços que você escolheu.
          </p>

        </div>


        {/* INFORMAÇÃO */}

        <div className="fornecedores-info">

          <strong>
            {fornecedoresFiltrados.length}
          </strong>

          <span>
            profissionais encontrados
            para o seu evento
          </span>

        </div>


        {/* GRID */}

        <div className="fornecedores-grid">


          {fornecedoresFiltrados.map(

            (fornecedor) => (

              <div
                className="fornecedor-card"
                key={fornecedor.id}
              >


                <div className="fornecedor-topo">


                  <div className="fornecedor-icone">

                    {fornecedor.icone}

                  </div>


                  <div className="fornecedor-avaliacao">

                    ⭐ {fornecedor.avaliacao}

                  </div>


                </div>


                <span className="fornecedor-categoria">

                  {fornecedor.categoria}

                </span>


                <h3>

                  {fornecedor.nome}

                </h3>


                <p className="fornecedor-descricao">

                  {fornecedor.descricao}

                </p>


                <div className="fornecedor-detalhes">


                  <span>

                    📍 {fornecedor.cidade}

                  </span>


                  <strong>

                    {fornecedor.preco}

                  </strong>


                </div>


                <button
                  className="botao-ver-fornecedor"
                  onClick={() =>
                    navigate(
                      `/fornecedor/${fornecedor.id}`
                    )
                  }
                >

                  Ver perfil →

                </button>


              </div>

            )

          )}


        </div>


        {/* VOLTAR */}

        <button
          className="botao-voltar-fornecedores"
          onClick={() =>
            navigate("/resultados")
          }
        >

          ← Voltar aos resultados

        </button>


      </main>


    </div>

  );

}