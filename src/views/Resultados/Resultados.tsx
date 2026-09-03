import {
  useLocation,
  useNavigate
} from "react-router-dom";


const nomesServicos: Record<string, string> = {

  FOTOGRAFIA: "Fotografia",

  GASTRONOMIA: "Gastronomia",

  FLORICULTURA: "Floricultura",

  MUSICA: "Música",

  DECORACAO: "Decoração",

  TRANSPORTE: "Transporte",

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

      <div>

        <h1>
          Nenhum evento encontrado.
        </h1>


        <button
          onClick={() =>
            navigate("/montar-evento")
          }
        >

          Montar evento

        </button>

      </div>

    );

  }


  return (

    <div>

      <h1>
        Seu evento está quase pronto! 🎉
      </h1>


      <p>
        Encontramos opções com base
        nas suas escolhas.
      </p>


      <hr />


      <h2>
        Resumo do evento
      </h2>


      <p>

        <strong>
          Orçamento:
        </strong>

        {" "}

        R${" "}

        {Number(
          orcamento
        ).toLocaleString(
          "pt-BR"
        )}

      </p>


      <p>

        <strong>
          Convidados:
        </strong>

        {" "}

        {convidados}

      </p>


      <p>

        <strong>
          Data:
        </strong>

        {" "}

        {dataEvento}

      </p>


      <h2>
        Serviços escolhidos
      </h2>


      <ul>

        {servicosSelecionados.map(
          (servico: string) => (

            <li
              key={servico}
            >

              {nomesServicos[servico]}

            </li>

          )
        )}

      </ul>


      <hr />


      <h2>
        Próximo passo
      </h2>


      <p>
        Agora vamos buscar fornecedores
        compatíveis com o seu orçamento.
      </p>


      <button
        onClick={() =>
          navigate("/selecionar-servicos")
        }
      >

        Voltar

      </button>


      <button
        onClick={() =>
          navigate("/inicio")
        }
      >

        Finalizar depois

      </button>

    </div>

  );

}