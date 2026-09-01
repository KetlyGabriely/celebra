import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { cadastrar } from "../../controllers/authController";

export default function CadastroCliente() {
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function cadastrarCliente() {
    try {
      setErro("");

      if (senha !== confirmarSenha) {
        throw new Error("As senhas não coincidem.");
      }

      setCarregando(true);

      await cadastrar(
        email,
        senha,
        nome,
        telefone,
        "CLIENTE"
      );

      alert("Cadastro realizado com sucesso!");

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
      <h1>Criar conta</h1>

      <h2>Cadastro de Cliente</h2>

      {erro && (
        <p>{erro}</p>
      )}

      <input
        type="text"
        placeholder="Nome completo"
        value={nome}
        onChange={(e) =>
          setNome(e.target.value)
        }
      />

      <input
        type="tel"
        placeholder="Telefone"
        value={telefone}
        onChange={(e) =>
          setTelefone(e.target.value)
        }
      />

      <input
        type="email"
        placeholder="E-mail"
        value={email}
        onChange={(e) =>
          setEmail(e.target.value)
        }
      />

      <input
        type="password"
        placeholder="Senha"
        value={senha}
        onChange={(e) =>
          setSenha(e.target.value)
        }
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
        onClick={cadastrarCliente}
        disabled={carregando}
      >
        {carregando
          ? "Cadastrando..."
          : "Criar conta"}
      </button>

      <button
        onClick={() =>
          navigate("/cadastro")
        }
      >
        Voltar
      </button>
    </div>
  );
}