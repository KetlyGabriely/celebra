import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  buscarMeuFornecedor,
  atualizarMeuFornecedor,
} from "../../../services/fornecedorService";
import "./PerfilFornecedor.css";

interface Fornecedor {
  id_fornecedor: number;
  nome_empresa: string;
  descricao: string;
  telefone: string;
  email: string;
  cidade: string;
  endereco: string;
  faixa_preco: string;
  disponibilidade: boolean;
}

export default function PerfilFornecedor() {
  const navigate = useNavigate();

  const [fornecedor, setFornecedor] = useState<Fornecedor | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [editando, setEditando] = useState(false);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState("");

  const [formulario, setFormulario] = useState({
    nome_empresa: "",
    descricao: "",
    telefone: "",
    email: "",
    cidade: "",
    endereco: "",
    faixa_preco: "",
  });

  useEffect(() => {
    carregarFornecedor();
  }, []);

  async function carregarFornecedor() {
    try {
      setCarregando(true);
      setErro("");

      const dados = await buscarMeuFornecedor();

      setFornecedor(dados);

      setFormulario({
        nome_empresa: dados.nome_empresa || "",
        descricao: dados.descricao || "",
        telefone: dados.telefone || "",
        email: dados.email || "",
        cidade: dados.cidade || "",
        endereco: dados.endereco || "",
        faixa_preco: dados.faixa_preco || "",
      });
    } catch (error) {
      console.error(error);
      setErro("Não foi possível carregar os dados da empresa.");
    } finally {
      setCarregando(false);
    }
  }

  function alterarCampo(
    campo: keyof typeof formulario,
    valor: string
  ) {
    setFormulario((estado) => ({
      ...estado,
      [campo]: valor,
    }));
  }

  async function salvarAlteracoes() {
    try {
      setSalvando(true);
      setErro("");

      const atualizado = await atualizarMeuFornecedor(formulario);

      setFornecedor(atualizado);
      setEditando(false);

      alert("Perfil atualizado com sucesso!");
    } catch (error) {
      console.error(error);
      setErro("Não foi possível salvar as alterações.");
    } finally {
      setSalvando(false);
    }
  }

  if (carregando) {
    return (
      <div className="perfil-page">
        <header className="perfil-header">
          <div
            className="perfil-logo"
            onClick={() => navigate("/inicio-fornecedor")}
          >
            Celebra <span>✦</span>
          </div>

          <nav className="perfil-nav">
            <button onClick={() => navigate("/inicio-fornecedor")}>
              Início
            </button>

            <button onClick={() => navigate("/meus-servicos")}>
              Meus serviços
            </button>

            <button onClick={() => navigate("/meus-eventos")}>
              Oportunidades
            </button>
          </nav>

          <button
            className="perfil-sair"
            onClick={() => navigate("/login")}
          >
            Sair
          </button>
        </header>

        <main className="perfil-loading">
          <div className="loader"></div>
          <p>Carregando perfil...</p>
        </main>
      </div>
    );
  }

  return (
    <div className="perfil-page">

      {/* HEADER */}
      <header className="perfil-header">

        <div
          className="perfil-logo"
          onClick={() => navigate("/inicio-fornecedor")}
        >
          Celebra <span>✦</span>
        </div>

        <nav className="perfil-nav">
          <button onClick={() => navigate("/inicio-fornecedor")}>
            Início
          </button>

          <button onClick={() => navigate("/meus-servicos")}>
            Meus serviços
          </button>

          <button onClick={() => navigate("/meus-eventos")}>
            Oportunidades
          </button>
        </nav>

        <button
          className="perfil-sair"
          onClick={() => navigate("/login")}
        >
          Sair
        </button>

      </header>

      {/* CONTEÚDO */}
      <main className="perfil-main">

        <button
          className="voltar-perfil"
          onClick={() => navigate("/inicio-fornecedor")}
        >
          ← Voltar ao painel
        </button>

        <section className="perfil-intro">
          <div>
            <span className="perfil-label">
              ÁREA DO FORNECEDOR
            </span>

            <h1>
              Perfil da <em>empresa.</em>
            </h1>

            <p>
              Mantenha as informações da sua empresa atualizadas
              para que os clientes conheçam melhor seus serviços.
            </p>
          </div>

          {!editando && (
            <button
              className="botao-editar"
              onClick={() => setEditando(true)}
            >
              ✎ Editar perfil
            </button>
          )}
        </section>

        {erro && (
          <div className="perfil-erro">
            {erro}
          </div>
        )}

        {/* CARD PRINCIPAL */}
        <section className="empresa-card">

          <div className="empresa-topo">

            <div className="empresa-icone">
              🏢
            </div>

            <div className="empresa-nome">
              <span>EMPRESA</span>

              <h2>
                {fornecedor?.nome_empresa || "Sua empresa"}
              </h2>

              <p>
                {fornecedor?.cidade || "Cidade não informada"}
              </p>
            </div>

          </div>

          <div className="linha-divisoria"></div>

          <div className="empresa-descricao">

            <span className="campo-titulo">
              Sobre sua empresa
            </span>

            {editando ? (
              <textarea
                value={formulario.descricao}
                onChange={(e) =>
                  alterarCampo("descricao", e.target.value)
                }
                placeholder="Conte um pouco sobre sua empresa..."
              />
            ) : (
              <p>
                {fornecedor?.descricao ||
                  "Nenhuma descrição cadastrada ainda."}
              </p>
            )}

          </div>

        </section>

        {/* INFORMAÇÕES */}
        <section className="secao-perfil">

          <div className="secao-titulo">
            <span>INFORMAÇÕES DE CONTATO</span>
            <h2>Como os clientes encontram você</h2>
          </div>

          <div className="informacoes-grid">

            <div className="info-card">
              <div className="info-icone">👤</div>

              <div>
                <span>Empresa</span>

                {editando ? (
                  <input
                    value={formulario.nome_empresa}
                    onChange={(e) =>
                      alterarCampo(
                        "nome_empresa",
                        e.target.value
                      )
                    }
                  />
                ) : (
                  <strong>
                    {fornecedor?.nome_empresa || "-"}
                  </strong>
                )}
              </div>
            </div>

            <div className="info-card">
              <div className="info-icone">📞</div>

              <div>
                <span>Telefone</span>

                {editando ? (
                  <input
                    value={formulario.telefone}
                    onChange={(e) =>
                      alterarCampo(
                        "telefone",
                        e.target.value
                      )
                    }
                  />
                ) : (
                  <strong>
                    {fornecedor?.telefone || "-"}
                  </strong>
                )}
              </div>
            </div>

            <div className="info-card">
              <div className="info-icone">✉</div>

              <div>
                <span>E-mail</span>

                {editando ? (
                  <input
                    value={formulario.email}
                    onChange={(e) =>
                      alterarCampo(
                        "email",
                        e.target.value
                      )
                    }
                  />
                ) : (
                  <strong>
                    {fornecedor?.email || "-"}
                  </strong>
                )}
              </div>
            </div>

            <div className="info-card">
              <div className="info-icone">📍</div>

              <div>
                <span>Cidade</span>

                {editando ? (
                  <input
                    value={formulario.cidade}
                    onChange={(e) =>
                      alterarCampo(
                        "cidade",
                        e.target.value
                      )
                    }
                  />
                ) : (
                  <strong>
                    {fornecedor?.cidade || "-"}
                  </strong>
                )}
              </div>
            </div>

          </div>

        </section>

        {/* LOCALIZAÇÃO */}
        <section className="secao-perfil">

          <div className="secao-titulo">
            <span>LOCALIZAÇÃO</span>
            <h2>Onde sua empresa está</h2>
          </div>

          <div className="endereco-card">

            <div className="endereco-icone">
              📍
            </div>

            <div className="endereco-conteudo">

              <span>Endereço</span>

              {editando ? (
                <input
                  value={formulario.endereco}
                  onChange={(e) =>
                    alterarCampo(
                      "endereco",
                      e.target.value
                    )
                  }
                  placeholder="Digite o endereço da empresa"
                />
              ) : (
                <strong>
                  {fornecedor?.endereco ||
                    "Endereço não informado"}
                </strong>
              )}

            </div>

          </div>

        </section>

        {/* INFORMAÇÕES COMERCIAIS */}
        <section className="secao-perfil">

          <div className="secao-titulo">
            <span>INFORMAÇÕES COMERCIAIS</span>
            <h2>Detalhes dos seus serviços</h2>
          </div>

          <div className="comercial-card">

            <div className="comercial-icone">
              💰
            </div>

            <div className="comercial-conteudo">

              <span>Faixa de preço</span>

              {editando ? (
                <input
                  value={formulario.faixa_preco}
                  onChange={(e) =>
                    alterarCampo(
                      "faixa_preco",
                      e.target.value
                    )
                  }
                  placeholder="Ex: R$ 1.500 - R$ 5.000"
                />
              ) : (
                <strong>
                  {fornecedor?.faixa_preco ||
                    "Não informado"}
                </strong>
              )}

              <p>
                Informe uma faixa aproximada para ajudar
                clientes a conhecerem seu serviço.
              </p>

            </div>

          </div>

        </section>

        {/* BOTÕES */}
        {editando && (
          <div className="acoes-perfil">

            <button
              className="botao-cancelar"
              onClick={() => {
                setEditando(false);

                if (fornecedor) {
                  setFormulario({
                    nome_empresa:
                      fornecedor.nome_empresa || "",
                    descricao:
                      fornecedor.descricao || "",
                    telefone:
                      fornecedor.telefone || "",
                    email:
                      fornecedor.email || "",
                    cidade:
                      fornecedor.cidade || "",
                    endereco:
                      fornecedor.endereco || "",
                    faixa_preco:
                      fornecedor.faixa_preco || "",
                  });
                }
              }}
            >
              Cancelar
            </button>

            <button
              className="botao-salvar"
              onClick={salvarAlteracoes}
              disabled={salvando}
            >
              {salvando
                ? "Salvando..."
                : "Salvar alterações"}
            </button>

          </div>
        )}

      </main>

    </div>
  );
}