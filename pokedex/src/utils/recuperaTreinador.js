export function recuperarTreinadorDoLocalStorage() {
  const treinadorString = localStorage.getItem("treinador");
  return treinadorString ? JSON.parse(treinadorString) : null;
}
