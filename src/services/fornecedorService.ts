import { supabase } from "./supabase";

export async function buscarMeuFornecedor() {
  const {
    data: { user },
    error: erroUsuario,
  } = await supabase.auth.getUser();

  if (erroUsuario || !user) {
    throw new Error("Usuário não autenticado.");
  }

  const { data, error } = await supabase
    .from("fornecedor")
    .select("*")
    .eq("id_usuario", user.id)
    .single();

  if (error) {
    console.error("Erro ao buscar fornecedor:", error);
    throw new Error(error.message);
  }

  return data;
}

export async function atualizarMeuFornecedor(dados: {
  nome_empresa: string;
  descricao: string;
  telefone: string;
  email: string;
  cidade: string;
  endereco: string;
  faixa_preco: string;
}) {
  const {
    data: { user },
    error: erroUsuario,
  } = await supabase.auth.getUser();

  if (erroUsuario || !user) {
    throw new Error("Usuário não autenticado.");
  }

  const { data: fornecedor, error: erroFornecedor } =
    await supabase
      .from("fornecedor")
      .select("id_fornecedor")
      .eq("id_usuario", user.id)
      .single();

  if (erroFornecedor || !fornecedor) {
    throw new Error("Fornecedor não encontrado.");
  }

  const { data, error } = await supabase
    .from("fornecedor")
    .update({
      nome_empresa: dados.nome_empresa,
      descricao: dados.descricao,
      telefone: dados.telefone,
      email: dados.email,
      cidade: dados.cidade,
      endereco: dados.endereco,
      faixa_preco: dados.faixa_preco,
    })
    .eq("id_fornecedor", fornecedor.id_fornecedor)
    .select()
    .single();

  if (error) {
    console.error("Erro ao atualizar fornecedor:", error);
    throw new Error(error.message);
  }

  return data;
}