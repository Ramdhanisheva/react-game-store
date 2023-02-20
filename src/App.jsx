import { Routes, Route, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { FirestoreContext } from "./context/FirestoreContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Games from "./pages/Games";
import GameDetails from "./pages/GameDetails";

const App = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const RequireAuth = ({ children }) => {
    return user ? children : navigate("/login");
  };

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth">
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
      </Route>
      <Route path="/games">
        <Route
          path=""
          element={
            <RequireAuth>
              <Games />
            </RequireAuth>
          }
        />
        <Route
          path=":name"
          element={
            <RequireAuth>
              <GameDetails />
            </RequireAuth>
          }
        />
      </Route>
    </Routes>
  );
};

export default App;
