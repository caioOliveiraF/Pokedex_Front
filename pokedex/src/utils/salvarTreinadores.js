import treinadorData from "../mock/treinadorData.json";

export function salvarTreinadoresNoLocalStorage(treinadores) {
  localStorage.setItem("treinadorData", JSON.stringify(treinadores));
}

export function recuperarTreinadoresDoLocalStorage() {
  const treinadoresString = localStorage.getItem("treinadorData");
  if (treinadoresString) {
    return JSON.parse(treinadoresString);
  } else {
    return treinadorData;
  }
}
