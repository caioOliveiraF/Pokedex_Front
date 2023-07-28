import React from "react";
import pokemonData from "../../mock/data.json";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import "primeflex/primeflex.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

export const PokemonId = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { id } = useParams();

  const findPokemonById = (id) => {
    return pokemonData.find((pokemon) => pokemon.id === parseInt(id));
  };

  const pokemon = findPokemonById(id);

  if (!pokemon) {
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
            width: "50%",
            minWidth: "200px",
            borderRadius: "20px",
            color: "white",
            marginBottom: "4rem",
          }}
        >
          <h1>Pokémon não encontrado.</h1>
          <img
            src="https://img.icons8.com/?size=512&id=13862&format=png"
            alt="Pokemon triste"
            style={{
              backgroundColor: "white",
              borderRadius: "50%",
              height: "4rem",
              padding: "1rem",
              animation: "spin 2s linear infinite",
            }}
          />
          {setTimeout(() => {
            navigate("/");
          }, 2300)}
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
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
            width: "50%",
            minWidth: "200px",
            borderRadius: "20px",
            color: "white",
            marginBottom: "4rem",
          }}
        >
          <h1>Você precisa fazer login para acessar esta pagina.</h1>
          <img
            src="https://img.icons8.com/?size=512&id=13862&format=png"
            alt="Pokemon triste"
            style={{
              backgroundColor: "white",
              borderRadius: "50%",
              height: "4rem",
              padding: "1rem",
              animation: "spin 2s linear infinite",
            }}
          />
          {setTimeout(() => {
            navigate("/login");
          }, 2300)}
        </div>
      </div>
    );
  }

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
          width: "50%",
          minWidth: "200px",
          borderRadius: "20px",
          color: "white",
          marginBottom: "4rem",
        }}
      >
        <h1>{pokemon.name.english}</h1>
        <h3>{pokemon.type.join(", ")}</h3>

        <img
          src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${pokemon.id
            .toString()
            .padStart(3, "0")}.png`}
          alt={pokemon.name.english}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.5)",
            border: "solid 4px",
            borderBottomColor: "#ffffff",
            borderRightColor: "#c2c2c2",
            borderTopColor: "#ba1212",
            borderLeftColor: "#ff1515",
            width: "40%",
            minWidth: "200px",
            borderRadius: "20px",
            color: "white",
            marginBottom: "2rem",
          }}
        >
          <h4>Informações do Pokémon</h4>
          <table
            style={{
              marginBottom: "1rem",
            }}
          >
            <tbody>
              {Object.entries(pokemon.base).map(([base, valor]) => (
                <tr key={base}>
                  <td
                    style={{
                      fontWeight: "bold",
                    }}
                  >
                    {base}:
                  </td>
                  <td>{valor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
