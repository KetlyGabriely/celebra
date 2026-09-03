import {

  buscarFornecedorLogado,

  cadastrarServico,

  buscarServicosFornecedor,

} from "../services/servicoService";

import {

  buscarSessao,

} from "../services/authService";


// ================================
// CADASTRAR NOVO SERVIÇO
// ================================

export async function criarServico(
  dados: {

    id_categoria: number;

    nome: string;

    descricao: string;

    preco: number;

    disponibilidade: boolean;

  }
) {

  // VALIDAÇÕES

  if (!dados.nome) {

    throw new Error(
      "Informe o nome do serviço."
    );

  }


  if (!dados.id_categoria) {

    throw new Error(
      "Selecione uma categoria."
    );

  }


  if (!dados.descricao) {

    throw new Error(
      "Informe uma descrição."
    );

  }


  if (
    dados.preco === undefined ||
    dados.preco < 0
  ) {

    throw new Error(
      "Informe um preço válido."
    );

  }


  // BUSCAR SESSÃO

  const sessao =
    await buscarSessao();


  if (!sessao) {

    throw new Error(
      "Usuário não está logado."
    );

  }


  // BUSCAR FORNECEDOR DO USUÁRIO LOGADO

  const fornecedor =
    await buscarFornecedorLogado(
      sessao.user.id
    );


  // CADASTRAR SERVIÇO

  return await cadastrarServico({

    id_fornecedor:
      fornecedor.id_fornecedor,

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

  });

}


// ================================
// LISTAR MEUS SERVIÇOS
// ================================

export async function listarMeusServicos() {

  const sessao =
    await buscarSessao();


  if (!sessao) {

    throw new Error(
      "Usuário não está logado."
    );

  }


  const fornecedor =
    await buscarFornecedorLogado(
      sessao.user.id
    );


  return await buscarServicosFornecedor(
    fornecedor.id_fornecedor
  );

}