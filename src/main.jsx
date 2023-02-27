import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { HashRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthContextProvider } from "./context/AuthContext";
import { FirestoreContextProvider } from "./context/FirestoreContext";
import { CartContextProvider } from "./context/CartContext";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HashRouter>
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
          <FirestoreContextProvider>
            <CartContextProvider>
              <App />
            </CartContextProvider>
          </FirestoreContextProvider>
        </AuthContextProvider>
      </QueryClientProvider>
    </HashRouter>
  </React.StrictMode>
);
