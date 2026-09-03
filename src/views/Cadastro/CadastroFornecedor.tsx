import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { cadastrarFornecedor } from "../../controllers/authController";

import "./CadastroFornecedor.css";


export default function CadastroFornecedor() {

  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] =
    useState("");

  const [nomeEmpresa, setNomeEmpresa] =
    useState("");

  const [descricao, setDescricao] =
    useState("");

  const [cidade, setCidade] =
    useState("");

  const [endereco, setEndereco] =
    useState("");

  const [faixaPreco, setFaixaPreco] =
    useState("");

  const [erro, setErro] =
    useState("");

  const [carregando, setCarregando] =
    useState(false);


  async function realizarCadastro() {

    try {

      setErro("");

      if (senha !== confirmarSenha) {

        throw new Error(
          "As senhas não coincidem."
        );

      }

      setCarregando(true);

      await cadastrarFornecedor({

        nome,
        telefone,
        email,
        senha,

        nome_empresa:
          nomeEmpresa,

        descricao,

        cidade,

        endereco,

        faixa_preco:
          faixaPreco
            ? Number(faixaPreco)
            : undefined,

      });


      alert(
        "Fornecedor cadastrado com sucesso!"
      );


      navigate("/");


    } catch (error) {

      setErro(
        error instanceof Error
          ? error.message
          : "Erro ao realizar cadastro."
      );

    } finally {

      setCarregando(false);

    }

  }


  return (

    <div className="cadastro-fornecedor-page">


      {/* HEADER */}

      <header className="cadastro-fornecedor-header">

        <h1>
          Celebra
        </h1>


        <button
          onClick={() =>
            navigate("/")
          }
        >
          Login
        </button>

      </header>


      <main className="cadastro-fornecedor-main">


        <div className="cadastro-fornecedor-card">


          {/* TÍTULO */}

          <div className="cadastro-fornecedor-titulo">

            <span>
              CONTA DE FORNECEDOR
            </span>


            <h2>
              Cadastre sua empresa
            </h2>


            <p>
              Divulgue seus serviços e encontre
              novos clientes para eventos.
            </p>

          </div>


          {/* ERRO */}

          {erro && (

            <div className="cadastro-fornecedor-erro">

              {erro}

            </div>

          )}


          {/* RESPONSÁVEL */}

          <div className="campo-fornecedor">

            <label>
              Nome do responsável
            </label>

            <input
              type="text"
              placeholder="Digite seu nome"
              value={nome}
              onChange={(e) =>
                setNome(e.target.value)
              }
            />

          </div>


          {/* EMPRESA */}

          <div className="campo-fornecedor">

            <label>
              Nome da empresa
            </label>

            <input
              type="text"
              placeholder="Nome da sua empresa"
              value={nomeEmpresa}
              onChange={(e) =>
                setNomeEmpresa(
                  e.target.value
                )
              }
            />

          </div>


          {/* LINHA DE CAMPOS */}

          <div className="linha-fornecedor">


            <div className="campo-fornecedor">

              <label>
                Telefone
              </label>

              <input
                type="tel"
                placeholder="(00) 00000-0000"
                value={telefone}
                onChange={(e) =>
                  setTelefone(
                    e.target.value
                  )
                }
              />

            </div>


            <div className="campo-fornecedor">

              <label>
                Cidade
              </label>

              <input
                type="text"
                placeholder="Sua cidade"
                value={cidade}
                onChange={(e) =>
                  setCidade(
                    e.target.value
                  )
                }
              />

            </div>

          </div>


          {/* EMAIL */}

          <div className="campo-fornecedor">

            <label>
              E-mail
            </label>

            <input
              type="email"
              placeholder="Digite seu e-mail"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />

          </div>


          {/* ENDEREÇO */}

          <div className="campo-fornecedor">

            <label>
              Endereço
            </label>

            <input
              type="text"
              placeholder="Endereço da empresa"
              value={endereco}
              onChange={(e) =>
                setEndereco(e.target.value)
              }
            />

          </div>


          {/* DESCRIÇÃO */}

          <div className="campo-fornecedor">

            <label>
              Sobre sua empresa
            </label>

            <textarea
              placeholder="Conte um pouco sobre sua empresa e seus serviços"
              value={descricao}
              onChange={(e) =>
                setDescricao(e.target.value)
              }
            />

          </div>


          {/* FAIXA DE PREÇO */}

          <div className="campo-fornecedor">

            <label>
              Faixa de preço inicial
            </label>

            <input
              type="number"
              placeholder="Exemplo: 1500"
              value={faixaPreco}
              onChange={(e) =>
                setFaixaPreco(e.target.value)
              }
            />

          </div>


          {/* SENHAS */}

          <div className="linha-fornecedor">


            <div className="campo-fornecedor">

              <label>
                Senha
              </label>

              <input
                type="password"
                placeholder="Mínimo 6 caracteres"
                value={senha}
                onChange={(e) =>
                  setSenha(e.target.value)
                }
              />

            </div>


            <div className="campo-fornecedor">

              <label>
                Confirmar senha
              </label>

              <input
                type="password"
                placeholder="Digite novamente"
                value={confirmarSenha}
                onChange={(e) =>
                  setConfirmarSenha(
                    e.target.value
                  )
                }
              />

            </div>

          </div>


          {/* BOTÃO PRINCIPAL */}

          <button
            className="botao-criar-fornecedor"
            onClick={realizarCadastro}
            disabled={carregando}
          >

            {carregando
              ? "Criando conta..."
              : "Criar minha conta"}

          </button>


          {/* VOLTAR */}

          <button
            className="botao-voltar-fornecedor"
            onClick={() =>
              navigate("/cadastro")
            }
          >
            Voltar
          </button>


          <div className="fornecedor-login">

            <p>
              Já possui uma conta?
            </p>


            <button
              onClick={() =>
                navigate("/")
              }
            >
              Entrar
            </button>

          </div>


        </div>

      </main>

    </div>

  );

}