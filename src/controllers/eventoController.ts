import { supabase } from "../services/supabase";

import {
  criarEvento,
  buscarEventosUsuario,
  buscarEvento,
  atualizarEvento,
  deletarEvento,
} from "../services/eventoService";

import type { Evento } from "../models/Evento";


// ==========================================
// PEGAR USUÁRIO LOGADO
// ==========================================

async function obterIdUsuario() {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    throw new Error("Não foi possível identificar o usuário.");
  }

  if (!user) {
    throw new Error("Usuário não está autenticado.");
  }

  return user.id;
}


// ==========================================
// CRIAR EVENTO
// ==========================================

export async function criarNovoEvento(
  dados: Omit<Evento, "id_usuario">
) {

  const idUsuario = await obterIdUsuario();

  const evento: Evento = {
    ...dados,
    id_usuario: idUsuario,
  };

  return await criarEvento(evento);
}


// ==========================================
// BUSCAR MEUS EVENTOS
// ==========================================

export async function buscarMeusEventos() {

  const idUsuario = await obterIdUsuario();

  return await buscarEventosUsuario(idUsuario);
}


// ==========================================
// BUSCAR EVENTO POR ID
// ==========================================

export async function buscarMeuEvento(idEvento: number) {

  const idUsuario = await obterIdUsuario();

  const evento = await buscarEvento(String(idEvento));

  if (evento.id_usuario !== idUsuario) {
    throw new Error(
      "Você não tem permissão para acessar este evento."
    );
  }

  return evento;
}


// ==========================================
// ATUALIZAR EVENTO
// ==========================================

export async function atualizarMeuEvento(
  idEvento: number,
  atualizacoes: Partial<Evento>
) {

  const idUsuario = await obterIdUsuario();

  const evento = await buscarEvento(String(idEvento));

  if (evento.id_usuario !== idUsuario) {
    throw new Error(
      "Você não tem permissão para editar este evento."
    );
  }

  return await atualizarEvento(
    String(idEvento),
    atualizacoes
  );
}


// ==========================================
// EXCLUIR EVENTO
// ==========================================

export async function excluirMeuEvento(
  idEvento: number
) {

  const idUsuario = await obterIdUsuario();

  const evento = await buscarEvento(String(idEvento));

  if (evento.id_usuario !== idUsuario) {
    throw new Error(
      "Você não tem permissão para excluir este evento."
    );
  }

  return await deletarEvento(
    String(idEvento)
  );
}