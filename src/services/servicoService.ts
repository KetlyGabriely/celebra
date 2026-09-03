import { supabase } from "./supabase";


// ================================
// BUSCAR FORNECEDOR LOGADO
// ================================

export async function buscarFornecedorLogado(
  idUsuario: string
) {

  const { data, error } =
    await supabase
      .from("fornecedor")
      .select("*")
      .eq(
        "id_usuario",
        idUsuario
      )
      .single();


  if (error) {

    throw new Error(
      error.message
    );

  }


  return data;

}


// ================================
// BUSCAR CATEGORIAS
// ================================

export async function buscarCategorias() {

  const { data, error } =
    await supabase
      .from("categoria")
      .select("*")
      .order(
        "nome",
        {
          ascending: true
        }
      );


  if (error) {

    throw new Error(
      error.message
    );

  }


  return data;

}


// ================================
// CADASTRAR SERVIÇO
// ================================

export async function cadastrarServico(
  dados: {

    id_fornecedor: number;

    id_categoria: number;

    nome: string;

    descricao: string;

    preco: number;

    disponibilidade: boolean;

  }
) {

  const { data, error } =
    await supabase
      .from("servico")
      .insert({

        id_fornecedor:
          dados.id_fornecedor,

        id_categoria:
          dados.id_categoria,

        nome:
          dados.nome,

        descricao:
          dados.descricao,

        preco:
          dados.preco,

        disponibilidade:
          dados.disponibilidade,

      })
      .select()
      .single();


  if (error) {

    throw new Error(
      error.message
    );

  }


  return data;

}


// ================================
// BUSCAR SERVIÇOS DO FORNECEDOR
// ================================

export async function buscarServicosFornecedor(
  idFornecedor: number
) {

  const { data, error } =
    await supabase
      .from("servico")
      .select(`
        *,
        categoria (
          id_categoria,
          nome
        )
      `)
      .eq(
        "id_fornecedor",
        idFornecedor
      )
      .order(
        "data_cadastro",
        {
          ascending: false
        }
      );


  if (error) {

    throw new Error(
      error.message
    );

  }


  return data;

}