import { Navigate } from "react-router-dom";

import { useEffect, useState } from "react";

import { buscarSessao } from "../services/authService";


interface RotaProtegidaProps {

  children: React.ReactNode;

}


export default function RotaProtegida({

  children,

}: RotaProtegidaProps) {

  const [carregando, setCarregando] =
    useState(true);

  const [autenticado, setAutenticado] =
    useState(false);


  useEffect(() => {

    async function verificarLogin() {

      try {

        const sessao =
          await buscarSessao();

        if (sessao) {

          setAutenticado(true);

        }

      } catch (error) {

        console.error(
          "Erro ao verificar sessão:",
          error
        );

      } finally {

        setCarregando(false);

      }

    }


    verificarLogin();

  }, []);


  if (carregando) {

    return (
      <div>
        Carregando...
      </div>
    );

  }


  if (!autenticado) {

    return (
      <Navigate
        to="/"
        replace
      />
    );

  }


  return children;

}