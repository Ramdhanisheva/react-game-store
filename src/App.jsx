import { Routes, Route, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Games from "./pages/Games";

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
        <Route path="signup" element={<Signup />} />
      </Route>
      <Route path="/games" element={
        <RequireAuth>
          <Games />
        </RequireAuth>
      } />
    </Routes>
  );
};

export default App;
