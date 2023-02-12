import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

const App = () => {
  const navigate = useNavigate()
  const { user } = useContext(AuthContext)

  const RequireAuth = ({children}) => {
    return user ? children : navigate('/login')
  } 

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth">
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Login />} />
      </Route>
    </Routes>
  );
};

export default App;
