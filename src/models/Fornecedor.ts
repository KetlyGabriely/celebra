export interface Fornecedor {
  id_fornecedor?: number;

  id_usuario?: string;

  nome_empresa: string;

  descricao?: string;

  telefone: string;

  email: string;

  cidade: string;

  endereco?: string;

  faixa_preco?: number;

  disponibilidade?: boolean;

  foto_url?: string;

  data_cadastro?: string;
}