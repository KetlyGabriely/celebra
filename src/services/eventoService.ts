import { supabase } from "./supabase";

import type { Evento } from "../models/Evento";


// ==========================================
// CRIAR EVENTO
// ==========================================

export async function criarEvento(evento: Evento) {

  const { data, error } = await supabase
    .from("evento")
    .insert([evento])
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data as Evento;
}


// ==========================================
// BUSCAR EVENTOS DO USUÁRIO
// ==========================================

export async function buscarEventosUsuario(
  idUsuario: string
) {

  const { data, error } = await supabase
    .from("evento")
    .select("*")
    .eq("id_usuario", idUsuario)
    .order("data_evento", {
      ascending: true,
    });

  if (error) {
    throw new Error(error.message);
  }

  return (data || []) as Evento[];
}


// ==========================================
// BUSCAR EVENTO POR ID
// ==========================================

export async function buscarEvento(
  idEvento: string
) {

  const { data, error } = await supabase
    .from("evento")
    .select("*")
    .eq("id_evento", idEvento)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data as Evento;
}


// ==========================================
// ATUALIZAR EVENTO
// ==========================================

export async function atualizarEvento(
  idEvento: string,
  atualizacoes: Partial<Evento>
) {

  const { data, error } = await supabase
    .from("evento")
    .update(atualizacoes)
    .eq("id_evento", idEvento)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data as Evento;
}


// ==========================================
// DELETAR EVENTO
// ==========================================

export async function deletarEvento(
  idEvento: string
) {

  const { error } = await supabase
    .from("evento")
    .delete()
    .eq("id_evento", idEvento);

  if (error) {
    throw new Error(error.message);
  }
}