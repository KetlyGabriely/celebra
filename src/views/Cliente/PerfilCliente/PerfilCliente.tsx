import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  buscarSessao,
  buscarUsuario,
  logout,
} from "../../../services/authService";

import { buscarMeusEventos } from "../../../controllers/eventoController";

import "./PerfilCliente.css";


interface Usuario {
  id_usuario?: string;
  nome?: string;
  email?: string;
  telefone?: string;
  tipo?: string;
}


export default function PerfilCliente() {

  const navigate = useNavigate();

  const [usuario, setUsuario] =
    useState<Usuario | null>(null);

  const [quantidadeEventos, setQuantidadeEventos] =
    useState(0);

  const [carregando, setCarregando] =
    useState(true);

  const [erro, setErro] =
    useState("");


  useEffect(() => {

    carregarPerfil();

  }, []);


  async function carregarPerfil() {

    try {

      setCarregando(true);
      setErro("");


      // ================================
      // BUSCAR USUÁRIO LOGADO
      // ================================

      const sessao = await buscarSessao();


      if (!sessao?.user?.id) {

        throw new Error(
          "Usuário não encontrado. Faça login novamente."
        );

      }


      // ================================
      // BUSCAR DADOS NA TABELA USUARIO
      // ================================

      const dadosUsuario =
        await buscarUsuario(
          sessao.user.id
        );


      setUsuario(dadosUsuario);


      // ================================
      // BUSCAR EVENTOS DO USUÁRIO
      // ================================

      const eventos =
        await buscarMeusEventos();


      setQuantidadeEventos(
        eventos.length
      );


    } catch (error) {

      console.error(
        "Erro ao carregar perfil:",
        error
      );


      if (error instanceof Error) {

        setErro(error.message);

      } else {

        setErro(
          "Não foi possível carregar seu perfil."
        );

      }

    } finally {

      setCarregando(false);

    }

  }


  // ================================
  // SAIR DA CONTA
  // ================================

  async function sair() {

    try {

      await logout();

      navigate("/");

    } catch (error) {

      console.error(
        "Erro ao sair:",
        error
      );

      alert(
        "Não foi possível sair da conta."
      );

    }

  }


  // ================================
  // CARREGANDO
  // ================================

  if (carregando) {

    return (

      <div className="perfil-page">

        <div className="perfil-loading">

          <div className="perfil-loading-icone">
            ✨
          </div>

          <h2>
            Carregando seu perfil...
          </h2>

          <p>
            Estamos buscando suas informações.
          </p>

        </div>

      </div>

    );

  }


  // ================================
  // ERRO
  // ================================

  if (erro) {

    return (

      <div className="perfil-page">


        <header className="perfil-header">

          <div
            className="perfil-logo"
            onClick={() =>
              navigate("/inicio")
            }
          >
            Celebra
          </div>

        </header>


        <main className="perfil-main">

          <div className="perfil-erro">

            <div>
              ⚠️
            </div>

            <h2>
              Não foi possível carregar seu perfil
            </h2>

            <p>
              {erro}
            </p>

            <button
              onClick={carregarPerfil}
            >
              Tentar novamente
            </button>

          </div>

        </main>

      </div>

    );

  }


  // ================================
  // DADOS DO USUÁRIO
  // ================================

  const nome =
    usuario?.nome ||
    "Cliente Celebra";


  const primeiraLetra =
    nome.charAt(0).toUpperCase();


  // ================================
  // PÁGINA
  // ================================

  return (

    <div className="perfil-page">


      {/* HEADER */}

      <header className="perfil-header">


        <div
          className="perfil-logo"
          onClick={() =>
            navigate("/inicio")
          }
        >
          Celebra
        </div>


        <nav className="perfil-nav">


          <button
            onClick={() =>
              navigate("/inicio")
            }
          >
            Início
          </button>


          <button
            onClick={() =>
              navigate(
                "/meus-eventos-cliente"
              )
            }
          >
            Meus eventos
          </button>


          <button
            onClick={() =>
              navigate(
                "/selecionar-servicos"
              )
            }
          >
            Fornecedores
          </button>


        </nav>


        <button
          className="perfil-icone-header"
        >
          👤
        </button>


      </header>



      {/* CONTEÚDO */}

      <main className="perfil-main">


        {/* TÍTULO */}

        <section className="perfil-titulo">

          <span>
            MINHA CONTA
          </span>


          <h1>
            Meu perfil
          </h1>


          <p>
            Gerencie suas informações e acompanhe
            sua conta no Celebra.
          </p>

        </section>



        {/* LAYOUT */}

        <section className="perfil-layout">


          {/* CARD DO PERFIL */}

          <article className="perfil-card-principal">


            <div className="perfil-avatar">

              {primeiraLetra}

            </div>


            <h2>
              {nome}
            </h2>


            <span className="perfil-tipo">

              Cliente

            </span>


            <div className="perfil-divisor" />


            {/* INFORMAÇÕES */}

            <div className="perfil-informacoes">


              <div className="perfil-informacao">

                <div className="perfil-info-icone">
                  ✉
                </div>

                <div>

                  <span>
                    E-mail
                  </span>

                  <strong>
                    {usuario?.email ||
                      "Não informado"}
                  </strong>

                </div>

              </div>



              <div className="perfil-informacao">

                <div className="perfil-info-icone">
                  ☎
                </div>

                <div>

                  <span>
                    Telefone
                  </span>

                  <strong>
                    {usuario?.telefone ||
                      "Não informado"}
                  </strong>

                </div>

              </div>



              <div className="perfil-informacao">

                <div className="perfil-info-icone">
                  👤
                </div>

                <div>

                  <span>
                    Tipo de conta
                  </span>

                  <strong>
                    Cliente
                  </strong>

                </div>

              </div>


            </div>


            <button
              className="perfil-editar"
              onClick={() =>
                navigate("/editar-perfil")
              }
            >
              Editar informações
            </button>


          </article>



          {/* COLUNA DIREITA */}

          <div className="perfil-lateral">


            {/* RESUMO */}

            <article className="perfil-resumo">


              <div className="perfil-card-topo">


                <div>

                  <span>
                    MEU CELEBRA
                  </span>


                  <h2>
                    Resumo da conta
                  </h2>

                </div>


                <div className="perfil-card-icone">
                  ✨
                </div>


              </div>



              <div className="perfil-estatisticas">


                <div>

                  <strong>
                    {quantidadeEventos}
                  </strong>

                  <span>
                    {quantidadeEventos === 1
                      ? "evento criado"
                      : "eventos criados"}
                  </span>

                </div>



                <div>

                  <strong>
                    ✓
                  </strong>

                  <span>
                    Conta ativa
                  </span>

                </div>


              </div>


            </article>



            {/* ATALHOS */}

            <article className="perfil-atalhos">


              <div className="perfil-card-topo">

                <div>

                  <span>
                    ACESSO RÁPIDO
                  </span>


                  <h2>
                    O que você deseja fazer?
                  </h2>

                </div>

              </div>



              <button
                onClick={() =>
                  navigate(
                    "/meus-eventos-cliente"
                  )
                }
              >

                <span className="atalho-icone">
                  📅
                </span>


                <div>

                  <strong>
                    Meus eventos
                  </strong>

                  <small>
                    Visualizar meus eventos
                  </small>

                </div>


                <span className="atalho-seta">
                  →
                </span>

              </button>



              <button
                onClick={() =>
                  navigate("/montar-evento")
                }
              >

                <span className="atalho-icone">
                  ✦
                </span>


                <div>

                  <strong>
                    Criar novo evento
                  </strong>

                  <small>
                    Começar um novo planejamento
                  </small>

                </div>


                <span className="atalho-seta">
                  →
                </span>

              </button>



              <button
                onClick={() =>
                  navigate(
                    "/selecionar-servicos"
                  )
                }
              >

                <span className="atalho-icone">
                  ♢
                </span>


                <div>

                  <strong>
                    Encontrar fornecedores
                  </strong>

                  <small>
                    Conhecer profissionais
                  </small>

                </div>


                <span className="atalho-seta">
                  →
                </span>

              </button>


            </article>


          </div>


        </section>



        {/* SAIR DA CONTA */}

        <section className="perfil-sair">


          <div>

            <span>
              CONTA
            </span>


            <h3>
              Deseja sair do Celebra?
            </h3>


            <p>
              Você poderá entrar novamente usando
              seu e-mail e senha.
            </p>

          </div>


          <button
            onClick={sair}
          >
            Sair da conta
          </button>


        </section>


      </main>


    </div>

  );

}