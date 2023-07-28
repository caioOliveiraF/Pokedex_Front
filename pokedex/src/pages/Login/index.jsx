import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { Divider } from "primereact/divider";
import { recuperarTreinadoresDoLocalStorage } from "../../utils/salvarTreinadores";
import treinadorData from "../../mock/treinadorData.json";
import "primeflex/primeflex.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

export const Login = () => {
  const navigate = useNavigate();
  const [nome, setNome] = useState("");
  const [senha, setSenha] = useState("");
  const [msg, setMsg] = useState("");
  const [errado, setErrado] = useState(false);

  const nomeDigitado = nome.trim().toLowerCase();

  const realizarLogin = () => {
    let treinadores = recuperarTreinadoresDoLocalStorage();

    if (treinadores.length === 0) {
      treinadores = treinadorData;
    }

    const treinadorEncontrado = treinadores.find(
      (treinador) =>
        treinador.nome.trim().toLowerCase() === nomeDigitado &&
        treinador.senha === senha
    );

    if ((nome === "") & (senha === "")) {
      setErrado(true);
      setMsg("Nome e Senha são obrigatorios.");
      return;
    }

    if (nome === "") {
      setErrado(true);
      setMsg("Nome e obrigatorio.");
      return;
    }

    if (senha === "") {
      setErrado(true);
      setMsg("Senha e obrigatorio.");
      return;
    }

    if (!treinadorEncontrado || treinadorEncontrado.senha !== senha) {
      setErrado(true);
      setMsg("Nome ou senha Incorretos.");
      return;
    }

    localStorage.setItem("treinador", JSON.stringify(treinadorEncontrado));

    setErrado(false);
    setMsg("Bem vindo " + nome);
    setTimeout(() => {
      navigate("/");
      window.location.reload();
    }, 1300);
  };

  const enviarParaCadastro = () => {
    navigate("/cadastro");
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.7)",
        minHeight: "52rem",
        paddingTop: "4rem",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "rgba(0,0,0,0.9)",
          border: "solid 4px",
          borderBottomColor: "#ffffff",
          borderRightColor: "#c2c2c2",
          borderTopColor: "#ba1212",
          borderLeftColor: "#ff1515",
          width: "20%",
          minWidth: "200px",
          borderRadius: "20px",
          color: "white",
        }}
      >
        <h1>Pokedex</h1>
        <h2 style={{ marginBottom: "2rem" }}>Login:</h2>
        <div
          style={{
            color: errado === false ? "white" : "red",
            fontWeight: "bold",
            marginBottom: "2rem",
            fontSize: "20px",
          }}
        >
          {msg}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            minWidth: "180px",
            marginBottom: "3rem",
          }}
        >
          <span
            className="p-float-label mb-3"
            style={{ display: "flex", width: "85%" }}
          >
            <InputText
              style={{
                width: "100%",
                backgroundColor: "#661a14",
                color: "#fff",
                border: errado === false ? "none" : "solid 2px red",
              }}
              id="nomeInput"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
            <label htmlFor="nomeInput" style={{ background: " #661a14" }}>
              Nome
            </label>
          </span>
          <span
            className="p-float-label mb-3"
            style={{ display: "flex", width: "85%" }}
          >
            <InputText
              style={{
                width: "100%",
                backgroundColor: "#661a14",
                border: errado === false ? "none" : "solid 2px red",
                color: "#fff",
              }}
              id="senhaInput"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
            <label htmlFor="senhaInput" style={{ background: " #661a14" }}>
              Senha
            </label>
          </span>
        </div>

        <Button
          style={{
            width: "5rem",
            height: "2.5rem",
            backgroundColor: "#661a14",
            color: "#fff",
            marginBottom: "2rem",
          }}
          label="Entrar"
          onClick={realizarLogin}
        ></Button>

        <Divider
          style={{
            width: "85%",
          }}
        />
        <h3
          onClick={enviarParaCadastro}
          style={{
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          Ainda não possui cadastro?
        </h3>
      </div>
    </div>
  );
};
