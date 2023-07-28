import React, { useState, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { salvarTreinadoresNoLocalStorage, recuperarTreinadoresDoLocalStorage } from "../../utils/salvarTreinadores";
import treinadorData from "../../mock/treinadorData.json";
import "primeflex/primeflex.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

export const Cadastro = () => {
  const navigate = useNavigate();
  const [nome, setNome] = useState("");
  const [senha, setSenha] = useState("");
  const [senhaConfirmacao, setSenhaConfirmacao] = useState("");
  const [foto, setFoto] = useState("");
  const [treinadores, setTreinadores] = useState(treinadorData);
  const [errado, setErrado] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const treinadoresLocalStorage = recuperarTreinadoresDoLocalStorage();
    setTreinadores(treinadoresLocalStorage);
  }, []);

  const fazerCadastro = (event) => {
    event.preventDefault();

    if (!nome & !senha) {
      setMsg("Os campos 'Nome' e 'Senha' são obrigatórios.");
      setErrado(true);
      return;
    }

    if (!nome) {
      setMsg("O campo 'Nome' é obrigatório.");
      setErrado(true);
      return;
    }

    if (!senha) {
      setMsg("O campo 'Senha' é obrigatório.");
      setErrado(true);
      return;
    }

    if (senha.length < 8) {
      setMsg("A senha deve ter pelo menos 8 caracteres.");
      setErrado(true);
      return;
    }

    if (senha !== senhaConfirmacao) {
      setMsg("As senhas não coincidem.");
      setErrado(true);
      return;
    }

    const novoTreinador = {
      id: treinadores.length + 1,
      nome,
      senha,
      foto,
    };

    const novosTreinadores = [...treinadores, novoTreinador];
    setTreinadores(novosTreinadores);
    salvarTreinadoresNoLocalStorage(novosTreinadores);

    setNome("");
    setSenha("");
    setSenhaConfirmacao("");
    setFoto("");
    setErrado(false);
    setMsg("Treinador cadastrado com sucesso!");
    setTimeout(() => {
      navigate("/login");
    }, 1300);
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
          width: "25%",
          minWidth: "200px",
          borderRadius: "20px",
          color: "white",
        }}
      >
        <h1>Cadastro</h1>
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
              id="senhaConfirmacaoInput"
              value={senhaConfirmacao}
              onChange={(e) => setSenhaConfirmacao(e.target.value)}
            />
            <label
              htmlFor="senhaConfirmacaoInput"
              style={{ background: " #661a14" }}
            >
              Confirme a senha
            </label>
          </span>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              width: "85%",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "40px",
                height: "40px",
                margin: "5px",
                backgroundColor: "white",
                borderRadius: "5px",
              }}
            >
              {foto === "" ? (
                <i
                  className="pi pi-user"
                  style={{
                    backgroundColor: "white",
                    color: "black",
                  }}
                ></i>
              ) : (
                <img
                  src={foto}
                  alt="foto"
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "5px",
                  }}
                />
              )}
            </div>
            <span
              className="p-float-label"
              style={{ display: "flex", width: "90%" }}
            >
              <InputText
                style={{
                  width: "100%",
                  backgroundColor: "#661a14",
                  border: "none",
                  color: "#fff",
                }}
                id="fotoInput"
                value={foto}
                onChange={(e) => setFoto(e.target.value)}
              />
              <label htmlFor="fotoInput" style={{ background: " #661a14" }}>
                Link da foto
              </label>
            </span>
          </div>
        </div>
        <Button
          onClick={fazerCadastro}
          label="Cadastrar"
          style={{
            width: "6.5rem",
            height: "2.5rem",
            backgroundColor: "#661a14",
            color: "#fff",
            marginBottom: "2rem",
          }}
        />
      </div>
    </div>
  );
};
