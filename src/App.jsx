import { AnimatePresence } from "framer-motion";
import { useContext } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Drawer from "./components/Drawer";
import { AuthContext } from "./context/AuthContext";
import GameDetails from "./pages/GameDetails";
import Games from "./pages/Games";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Signup from "./pages/Signup";
import log from "loglevel";

const App = () => {
  if (process.env.NODE_ENV === "production") {
    log.setLevel("warn");
  } else {
    log.setLevel("debug");
  }

  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const location = useLocation();

  const RequireAuth = ({ children }) => {
    return user ? children : navigate("/auth/login");
  };

  return (
    <AnimatePresence mode="wait">
      <Routes key={location.pathname} location={location}>
        <Route
          path="/"
          element={
            <Drawer>
              <Home />
            </Drawer>
          }
        />
        <Route path="/auth">
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
        </Route>
        <Route path="/games">
          <Route
            path=""
            element={
              <RequireAuth>
                <Drawer>
                  <Games />
                </Drawer>
              </RequireAuth>
            }
          />
          <Route
            path=":id"
            element={
              <RequireAuth>
                <Drawer>
                  <GameDetails />
                </Drawer>
              </RequireAuth>
            }
          />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
};

export { App as default };
