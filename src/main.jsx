import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { HashRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthContextProvider } from "./context/AuthContext";
import { FirestoreContextProvider } from "./context/FirestoreContext";
import { CartContextProvider } from "./context/CartContext";
import { GoogleOAuthProvider } from "@react-oauth/google";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HashRouter>
      <QueryClientProvider client={queryClient}>
        <GoogleOAuthProvider clientId="613765418433-bkp26ka2u3cf69h1raen6pkhajkj7ik1.apps.googleusercontent.com">
          <AuthContextProvider>
            <FirestoreContextProvider>
              <CartContextProvider>
                <App />
              </CartContextProvider>
            </FirestoreContextProvider>
          </AuthContextProvider>
        </GoogleOAuthProvider>
      </QueryClientProvider>
    </HashRouter>
  </React.StrictMode>
);
