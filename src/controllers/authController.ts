import {
  login,
  logout,
  buscarSessao,
  buscarUsuario,
  cadastrarUsuario,
} from "../services/authService";

import type {
  TipoUsuario,
} from "../models/Usuario";


export async function entrar(
  email: string,
  senha: string
) {
  if (!email || !senha) {
    throw new Error(
      "Informe e-mail e senha."
    );
  }

  const dados = await login(
    email,
    senha
  );

  if (!dados.user) {
    throw new Error(
      "Não foi possível realizar o login."
    );
  }

  const usuario = await buscarUsuario(
    dados.user.id
  );

  return {
    auth: dados,
    usuario,
  };
}


export async function cadastrar(
  email: string,
  senha: string,
  nome: string,
  telefone: string,
  tipo: TipoUsuario
) {
  if (!email || !senha || !nome || !telefone) {
    throw new Error(
      "Preencha todos os campos obrigatórios."
    );
  }

  if (senha.length < 6) {
    throw new Error(
      "A senha deve ter pelo menos 6 caracteres."
    );
  }

  return await cadastrarUsuario({
    nome,
    telefone,
    email,
    senha,
    tipo,
  });
}

export async function cadastrarFornecedor(dados: {
  nome: string;
  telefone: string;
  email: string;
  senha: string;
  nome_empresa: string;
  descricao?: string;
  cidade: string;
  endereco?: string;
  faixa_preco?: number;
}) {
  if (
    !dados.nome ||
    !dados.telefone ||
    !dados.email ||
    !dados.senha ||
    !dados.nome_empresa ||
    !dados.cidade
  ) {
    throw new Error(
      "Preencha todos os campos obrigatórios."
    );
  }

  if (dados.senha.length < 6) {
    throw new Error(
      "A senha deve ter pelo menos 6 caracteres."
    );
  }

  return await cadastrarUsuario({
    ...dados,
    tipo: "FORNECEDOR",
  });
}


export async function sair() {
  await logout();
}


export async function obterSessao() {
  return await buscarSessao();
}