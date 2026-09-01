import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { cadastrarFornecedor } from "../../controllers/authController";

export default function CadastroFornecedor() {
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  const [nomeEmpresa, setNomeEmpresa] = useState("");
  const [descricao, setDescricao] = useState("");
  const [cidade, setCidade] = useState("");
  const [endereco, setEndereco] = useState("");
  const [faixaPreco, setFaixaPreco] = useState("");

  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function realizarCadastro() {
    try {
      setErro("");

      if (senha !== confirmarSenha) {
        throw new Error("As senhas não coincidem.");
      }

      setCarregando(true);

      await cadastrarFornecedor({
        nome,
        telefone,
        email,
        senha,
        nome_empresa: nomeEmpresa,
        descricao,
        cidade,
        endereco,
        faixa_preco: faixaPreco
          ? Number(faixaPreco)
          : undefined,
      });

      alert("Fornecedor cadastrado com sucesso!");

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
    <div>
      <h1>Celebra</h1>

      <h2>Cadastro de Fornecedor</h2>

      <p>
        Cadastre sua empresa para oferecer serviços
        para eventos.
      </p>

      {erro && <p>{erro}</p>}

      <input
        type="text"
        placeholder="Nome do responsável"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />

      <input
        type="text"
        placeholder="Nome da empresa"
        value={nomeEmpresa}
        onChange={(e) => setNomeEmpresa(e.target.value)}
      />

      <input
        type="tel"
        placeholder="Telefone"
        value={telefone}
        onChange={(e) => setTelefone(e.target.value)}
      />

      <input
        type="email"
        placeholder="E-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="text"
        placeholder="Cidade"
        value={cidade}
        onChange={(e) => setCidade(e.target.value)}
      />

      <input
        type="text"
        placeholder="Endereço"
        value={endereco}
        onChange={(e) => setEndereco(e.target.value)}
      />

      <textarea
        placeholder="Descrição da empresa ou serviços"
        value={descricao}
        onChange={(e) => setDescricao(e.target.value)}
      />

      <input
        type="number"
        placeholder="Faixa de preço"
        value={faixaPreco}
        onChange={(e) => setFaixaPreco(e.target.value)}
      />

      <input
        type="password"
        placeholder="Senha"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
      />

      <input
        type="password"
        placeholder="Confirmar senha"
        value={confirmarSenha}
        onChange={(e) =>
          setConfirmarSenha(e.target.value)
        }
      />

      <button
        onClick={realizarCadastro}
        disabled={carregando}
      >
        {carregando
          ? "Cadastrando..."
          : "Criar conta"}
      </button>

      <button onClick={() => navigate("/cadastro")}>
        Voltar
      </button>
    </div>
  );
}