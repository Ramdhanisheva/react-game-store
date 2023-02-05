import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";

const App = () => {
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
