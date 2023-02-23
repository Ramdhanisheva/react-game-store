import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { HashRouter } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import { FirestoreContextProvider } from "./context/FirestoreContext";
import { CartContextProvider } from "./context/CartContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HashRouter>
      <AuthContextProvider>
        <FirestoreContextProvider>
          <CartContextProvider>
            <App />
          </CartContextProvider>
        </FirestoreContextProvider>
      </AuthContextProvider>
    </HashRouter>
  </React.StrictMode>
);
