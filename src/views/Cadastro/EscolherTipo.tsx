import { useNavigate } from "react-router-dom";

export default function EscolherTipo() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Como você deseja usar o Celebra?</h1>

      <p>Escolha o tipo de conta que deseja criar.</p>

      <div>
        <div>
          <h2>👤 Cliente</h2>

          <p>
            Quero organizar eventos, contratar fornecedores
            e gerenciar tudo em um só lugar.
          </p>

          <button
            onClick={() =>
              navigate("/cadastro/cliente")
            }
          >
            Criar conta como Cliente
          </button>
        </div>

        <div>
          <h2>🏢 Fornecedor</h2>

          <p>
            Quero divulgar meus serviços e encontrar
            clientes para eventos.
          </p>

          <button
            onClick={() =>
              navigate("/cadastro/fornecedor")
            }
          >
            Criar conta como Fornecedor
          </button>
        </div>
      </div>

      <p>
        Já possui uma conta?
      </p>

      <button onClick={() => navigate("/")}>
        Voltar para Login
      </button>
    </div>
  );
}