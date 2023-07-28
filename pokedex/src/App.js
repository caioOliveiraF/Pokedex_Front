import * as React from "react";
import { Route, Routes } from "react-router-dom";
import { BrowserRouter as Router, useLocation } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import "primereact/resources/themes/md-dark-indigo/theme.css";
import { Home } from "./pages/Home";
import { Header } from "./components/Header";
import { PokemonId } from "./pages/PokemonId";
import { Login } from "./pages/Login";
import { Cadastro } from "./pages/Cadastro";

const Wrapper = ({ children }) => {
  const location = useLocation();
  React.useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [location.pathname]);
  return children;
};

function App() {
  return (
    <AuthProvider>
      <div
        class="bg-repeat-round"
        style={{
          minHeight: "58rem",
          backgroundImage: `url(
    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Pok%C3%A9_Ball_icon.svg/1200px-Pok%C3%A9_Ball_icon.svg.png"
  )`,
          backgroundSize: "6rem",
        }}
      >
        <Router>
          <Header />
          <Wrapper>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/cadastro" element={<Cadastro />} />
              <Route path="/pokemon/:id" element={<PokemonId />} />
            </Routes>
          </Wrapper>
        </Router>
      </div>
    </AuthProvider>
  );
}

export default App;
