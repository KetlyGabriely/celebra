export interface Evento {
  id_evento?: number;
  id_usuario: string;

  nome: string;
  tipo_evento: string;
  tema?: string;

  data_evento: string;
  horario?: string;
  local?: string;

  qtd_convidados: number;
  orcamento: number;

  status?: string;
  data_criacao?: string;
}

export interface EventoComServicos extends Evento {
  servicos?: any[];
}