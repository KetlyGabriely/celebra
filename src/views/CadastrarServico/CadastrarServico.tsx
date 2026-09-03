import {
  useEffect,
  useState,
} from "react";

import { useNavigate } from "react-router-dom";

import {
  criarServico,
} from "../../controllers/servicoController";

import {
  buscarCategorias,
} from "../../services/servicoService";

import "./CadastrarServico.css";


interface Categoria {

  id_categoria: number;

  nome: string;

}


export default function CadastrarServico() {

  const navigate = useNavigate();


  const [nome, setNome] =
    useState("");

  const [idCategoria, setIdCategoria] =
    useState("");

  const [descricao, setDescricao] =
    useState("");

  const [preco, setPreco] =
    useState("");


  const [categorias, setCategorias] =
    useState<Categoria[]>([]);


  const [erro, setErro] =
    useState("");


  const [carregando, setCarregando] =
    useState(false);


  const [
    carregandoCategorias,
    setCarregandoCategorias,
  ] = useState(true);


  /* ================================
     CARREGAR CATEGORIAS
  ================================= */

  useEffect(() => {

    async function carregarCategorias() {

      try {

        setCarregandoCategorias(true);

        const dados =
          await buscarCategorias();


        setCategorias(
          dados
        );


      } catch (error) {

        setErro(

          error instanceof Error

            ? error.message

            : "Erro ao carregar categorias."

        );


      } finally {

        setCarregandoCategorias(
          false
        );

      }

    }


    carregarCategorias();

  }, []);


  /* ================================
     CADASTRAR SERVIÇO
  ================================= */

  async function cadastrarServico() {

    try {

      setErro("");


      if (!nome.trim()) {

        throw new Error(
          "Informe o nome do serviço."
        );

      }


      if (!idCategoria) {

        throw new Error(
          "Selecione uma categoria."
        );

      }


      if (!descricao.trim()) {

        throw new Error(
          "Informe uma descrição para o serviço."
        );

      }


      if (!preco || Number(preco) <= 0) {

        throw new Error(
          "Informe um preço válido."
        );

      }


      setCarregando(true);


      await criarServico({

        id_categoria:
          Number(idCategoria),

        nome,

        descricao,

        preco:
          Number(preco),

        disponibilidade:
          true,

      });


      alert(
        "Serviço cadastrado com sucesso!"
      );


      navigate(
        "/meus-servicos"
      );


    } catch (error) {

      setErro(

        error instanceof Error

          ? error.message

          : "Erro ao cadastrar serviço."

      );


    } finally {

      setCarregando(false);

    }

  }


  return (

    <div className="cadastrar-servico-page">


      {/* =========================
          HEADER
      ========================= */}

      <header className="cadastrar-servico-header">

        <h1>
          Celebra
        </h1>


        <button
          className="header-voltar-servico"
          onClick={() =>
            navigate("/meus-servicos")
          }
          disabled={carregando}
        >
          Meus serviços
        </button>

      </header>


      {/* =========================
          CONTEÚDO
      ========================= */}

      <main className="cadastrar-servico-main">


        <div className="cadastrar-servico-container">


          {/* TÍTULO */}

          <div className="cadastrar-servico-titulo">

            <span>
              NOVO SERVIÇO
            </span>


            <h2>
              Cadastre um novo serviço
            </h2>


            <p>
              Adicione os detalhes do serviço que sua
              empresa oferece para começar a receber
              oportunidades de novos eventos.
            </p>

          </div>


          {/* CARD */}

          <div className="cadastrar-servico-card">


            {/* CABEÇALHO DO FORMULÁRIO */}

            <div className="formulario-header">

              <div className="formulario-icone">
                ✦
              </div>


              <div>

                <h3>
                  Informações do serviço
                </h3>


                <p>
                  Preencha os dados abaixo.
                </p>

              </div>

            </div>


            {/* ERRO */}

            {erro && (

              <div className="cadastrar-servico-erro">

                {erro}

              </div>

            )}


            {/* NOME */}

            <div className="campo-servico">

              <label>
                Nome do serviço
              </label>


              <input
                type="text"
                placeholder="Ex: Fotografia para casamento"
                value={nome}
                onChange={(e) =>
                  setNome(e.target.value)
                }
              />

            </div>


            {/* CATEGORIA */}

            <div className="campo-servico">

              <label>
                Categoria
              </label>


              <select
                value={idCategoria}
                onChange={(e) =>
                  setIdCategoria(
                    e.target.value
                  )
                }
                disabled={
                  carregandoCategorias ||
                  carregando
                }
              >

                <option value="">

                  {carregandoCategorias

                    ? "Carregando categorias..."

                    : "Selecione uma categoria"

                  }

                </option>


                {categorias.map(
                  (categoria) => (

                    <option
                      key={
                        categoria.id_categoria
                      }
                      value={
                        categoria.id_categoria
                      }
                    >

                      {categoria.nome}

                    </option>

                  )
                )}

              </select>

            </div>


            {/* DESCRIÇÃO */}

            <div className="campo-servico">

              <label>
                Descrição do serviço
              </label>


              <textarea
                placeholder="Descreva o serviço, o que está incluso e os diferenciais da sua empresa..."
                value={descricao}
                onChange={(e) =>
                  setDescricao(
                    e.target.value
                  )
                }
              />

            </div>


            {/* PREÇO */}

            <div className="campo-servico">

              <label>
                Preço inicial
              </label>


              <div className="preco-input">

                <span>
                  R$
                </span>


                <input
                  type="number"
                  placeholder="Ex: 1500"
                  min="0"
                  value={preco}
                  onChange={(e) =>
                    setPreco(
                      e.target.value
                    )
                  }
                />

              </div>


              <small>
                Informe o valor inicial do serviço.
              </small>

            </div>


            {/* STATUS */}

            <div className="servico-status">

              <div className="status-indicador">

                ✓

              </div>


              <div>

                <strong>
                  Serviço disponível
                </strong>


                <p>
                  Seu serviço ficará disponível
                  para oportunidades de eventos.
                </p>

              </div>

            </div>


            {/* BOTÕES */}

            <div className="cadastrar-servico-botoes">


              <button
                className="botao-cancelar-servico"
                onClick={() =>
                  navigate("/meus-servicos")
                }
                disabled={carregando}
              >
                Cancelar
              </button>


              <button
                className="botao-cadastrar-servico"
                onClick={cadastrarServico}
                disabled={
                  carregando ||
                  carregandoCategorias
                }
              >

                {carregando

                  ? "Cadastrando..."

                  : "Cadastrar serviço"

                }

              </button>


            </div>


          </div>


          {/* RODAPÉ */}

          <div className="cadastrar-servico-info">

            <span>
              ✦
            </span>

            <p>
              Você poderá editar as informações
              do serviço posteriormente.
            </p>

          </div>


        </div>


      </main>


    </div>

  );

}