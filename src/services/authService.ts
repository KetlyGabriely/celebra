import { supabase } from "./supabase";

import type {
  TipoUsuario,
} from "../models/Usuario";


// ================================
// LOGIN
// ================================

export async function login(
  email: string,
  senha: string
) {
  const { data, error } =
    await supabase.auth.signInWithPassword({
      email,
      password: senha,
    });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}


// ================================
// LOGOUT
// ================================

export async function logout() {
  const { error } =
    await supabase.auth.signOut();

  if (error) {
    throw new Error(error.message);
  }
}


// ================================
// BUSCAR SESSÃO
// ================================

export async function buscarSessao() {
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error) {
    throw new Error(error.message);
  }

  return session;
}


// ================================
// BUSCAR USUÁRIO
// ================================

export async function buscarUsuario(
  idUsuario: string
) {
  const { data, error } =
    await supabase
      .from("usuario")
      .select("*")
      .eq("id_usuario", idUsuario)
      .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}


// ================================
// CADASTRAR USUÁRIO
// EDGE FUNCTION: register-user
// ================================

export async function cadastrarUsuario(dados: {
  nome: string;
  telefone: string;
  email: string;
  senha: string;
  tipo: TipoUsuario;

  // Campos específicos do fornecedor
  nome_empresa?: string;
  descricao?: string;
  cidade?: string;
  endereco?: string;
  faixa_preco?: number;
}) {
  const { data, error } =
    await supabase.functions.invoke(
      "register-user",
      {
        body: dados,
      }
    );

  if (error) {
    throw new Error(error.message);
  }

  if (!data?.sucesso) {
    throw new Error(
      data?.mensagem ||
      "Erro ao cadastrar usuário."
    );
  }

  return data;
}