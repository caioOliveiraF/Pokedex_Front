import React from "react";
import pokemonData from "../../mock/data.json";
import treinadorData from "../../mock/treinadorData.json";
import { recuperarTreinadoresDoLocalStorage } from "../../utils/salvarTreinadores";
import { useNavigate } from "react-router-dom";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useAuth } from "../../contexts/AuthContext";
import "primeflex/primeflex.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

export const Home = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const pokemons = pokemonData.map((pokemon) => {
    return {
      ...pokemon,
      type: pokemon.type.join(", "),
    };
  });

  const imageBodyTemplate = (rowData) => {
    return (
      <img
        src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${rowData.id
          .toString()
          .padStart(3, "0")}.png`}
        alt={rowData.name.english}
        width="88px"
      />
    );
  };

  const buttonBodyTemplate = (rowData) => {
    return (
      <img
        src="https://img.icons8.com/?size=512&id=45661&format=png"
        alt="ir para informações do pokemon"
        width="40px"
        onClick={() => enviarParaPokemon(rowData.id)}
        style={{
          cursor: "pointer",
          backgroundColor: "rgb(84, 8, 8)",
          borderRadius: "10px",
        }}
      />
    );
  };

  const enviarParaPokemon = (id) => {
    navigate(`/pokemon/${id}`);
  };

  const treinadoresLocalStorage = recuperarTreinadoresDoLocalStorage();
  const treinadores =
    treinadoresLocalStorage.length > 0
      ? treinadoresLocalStorage
      : treinadorData;

  const treinadorImageBodyTemplate = (rowData) => {
    return rowData.foto ? (
      <img
        src={rowData.foto}
        alt={rowData.nome}
        width="88px"
        height="88px"
        style={{ borderRadius: "50%" }}
      />
    ) : (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "white",
          borderRadius: "50%",
          width: "88px",
          height: "88px",
        }}
      >
        <i
          className="pi pi-user"
          style={{
            color: "black",
          }}
        ></i>
      </div>
    );
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        backgroundColor: "rgba(0,0,0,0.7)",
        minHeight: "52rem",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "70%",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(0,0,0,0.9)",
            border: "solid 4px",
            borderRight: "solid 2px",
            borderBottomColor: "#ffffff",
            borderRightColor: "#c2c2c2",
            borderTopColor: "#ba1212",
            borderLeftColor: "#ff1515",
            width: "100%",
          }}
        >
          <img
            src="https://img.icons8.com/?size=512&id=16460&format=png"
            alt="pokedex"
            style={{ width: "4rem", marginRight: "1rem" }}
          />
          <h1>Pokedex</h1>
        </div>
        <div
          style={{
            width: "100%",
            borderRight: "solid 2px",
            borderBottom: "solid 4px",
            borderBottomColor: "#ffffff",
            borderRightColor: "#c2c2c2",
          }}
        >
          <DataTable
            value={pokemons}
            paginator
            rows={5}
            rowsPerPageOptions={[5, 10, 25, 50]}
          >
            <Column
              field={buttonBodyTemplate}
              header="+ Info"
              style={{ width: "6%" }}
            />
            <Column field={imageBodyTemplate} style={{ width: "15%" }} />
            <Column
              field="name.english"
              header="Nome"
              style={{ width: "65%" }}
            />
            <Column field="type" header="Tipo" />
          </DataTable>
        </div>
      </div>
      <div
        style={{
          width: "2%",
          backgroundColor: "rgba(0,0,0,0.9)",
          borderTop: "solid 4px",
          borderBottom: "solid 4px",
          borderLeft: "solid 2px",
          borderRight: "solid 2px",
          borderTopColor: "#ba1212",
          borderBottomColor: "#ffffff",
        }}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "28%",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(0,0,0,0.9)",
            border: "solid 4px",
            borderRight: "solid 2px",
            borderBottomColor: "#ffffff",
            borderRightColor: "#c2c2c2",
            borderTopColor: "#ba1212",
            borderLeftColor: "#ff1515",
            width: "100%",
          }}
        >
          <img
            src="https://img.icons8.com/?size=512&id=16461&format=png"
            alt="pokedex"
            style={{ width: "4rem", marginRight: "1rem" }}
          />
          <h1>Treinadores</h1>
        </div>
        <div
          style={{
            borderLeft: "solid 2px",
            borderBottom: "solid 4px",
            borderBottomColor: "#ffffff",
            borderLefttColor: "#c2c2c2",
            width: "100%",
          }}
        >
          <DataTable
            value={treinadores}
            paginator
            rows={5}
            rowsPerPageOptions={[5, 10, 25, 50]}
          >
            <Column
              field={treinadorImageBodyTemplate}
              style={{ width: "20%" }}
            />
            <Column field="nome" header="Nome" style={{ width: "80%" }} />
          </DataTable>
        </div>
      </div>
    </div>
  );
};
