import React from "react";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import "primeflex/primeflex.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

export const Header = () => {
  const navigate = useNavigate();

  const sair = () => {
    localStorage.removeItem("treinador");
    setTimeout(() => {
      navigate("/login");
      window.location.reload();
    }, 1300);
  };

  const verificarTreinadorLogado = () => {
    const treinadorLogado = localStorage.getItem("treinador");
    return treinadorLogado ? JSON.parse(treinadorLogado) : null;
  };

  const treinadorLogado = verificarTreinadorLogado();

  const enviarParaLogin = () => {
    navigate("/login");
  };

  const enviarParaHome = () => {
    navigate("/");
  };

  return (
    <div
      className="flex align-items-center justify-content-between flex-wrap"
      style={{
        minHeight: "100px",
        backgroundColor: "rgb(24, 24, 24)",
        borderBottom: "solid 2px #ba1212",
      }}
    >
      <Button
        className=" bg-white flex align-items-center justify-content-center m-3"
        style={{ borderRadius: "50%", width: "4.5rem", height: "4.5rem" }}
        onClick={enviarParaHome}
      >
        <img
          className="h-5rem"
          alt="Logo Pokedex"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Pok%C3%A9_Ball_icon.svg/1200px-Pok%C3%A9_Ball_icon.svg.png"
        />
      </Button>
      {treinadorLogado ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "1rem",
            backgroundColor: "#661a14",
            borderRadius: "5px",
            padding: "4px",
          }}
        >
          {treinadorLogado.foto === "" ? (
            <i
              className="pi pi-user"
              style={{
                backgroundColor: "white",
                color: "black",
                padding:"3px",
                borderRadius:"50%"
              }}
            ></i>
          ) : (
            <img
              alt="Foto do Treinador"
              src={treinadorLogado.foto}
              style={{
                width: "30px",
                height: "30px",
                borderRadius: "50%",
              }}
            />
          )}
          <h3
            style={{
              color: "#fff",
              margin: "1px",
              marginRight: "5px",
              marginLeft: "5px",
            }}
          >
            {treinadorLogado.nome}
          </h3>
          <div
          onClick={sair}
            style={{
              cursor:"pointer",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <p style={{ margin: "1px", marginLeft: "15px"}}>Sair</p>
            <i
              className="pi pi-sign-out"
              style={{ color: "white", marginLeft: "3px"}}
            ></i>
          </div>
        </div>
      ) : (
        <Button
          className="flex align-items-center justify-content-center m-3"
          style={{
            borderRadius: "5%",
            width: "4.5rem",
            height: "2rem",
            backgroundColor: "#661a14",
            color: "#fff",
          }}
          onClick={enviarParaLogin}
        >
          <h3>Login</h3>
        </Button>
      )}
    </div>
  );
};
