export type TipoUsuario =
  | "CLIENTE"
  | "FORNECEDOR";

export interface Usuario {
  id_usuario?: string;
  nome: string;
  telefone?: string;
  tipo: TipoUsuario;
  data_cadastro?: string;
}