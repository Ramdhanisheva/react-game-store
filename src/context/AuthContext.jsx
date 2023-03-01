import { useEffect } from "react";
import { useReducer } from "react";
import { createContext } from "react";

const AuthReducer = (state, action) => {
  switch (action.type) {
    case "login":
      if (action.isRemember) {
        return {
          currentUser: action.payload,
          isRemember: action.isRemember,
        };
      } else {
        return {
          currentUser: action.payload,
          isRemember: null,
        };
      }
    case "logout":
      return {
        currentUser: null,
        isRemember: null,
      };
    default:
      return state;
  }
};

const AuthContext = createContext(null);
const initialState = {
  currentUser:
    JSON.parse(sessionStorage.getItem("user")) ||
    JSON.parse(localStorage.getItem("user")) ||
    null,
};

const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  useEffect(() => {
    state.isRemember && state.currentUser
      ? localStorage.setItem("user", JSON.stringify(state.currentUser))
      : sessionStorage.setItem("user", JSON.stringify(state.currentUser));

    !state.currentUser &&
      localStorage.setItem("user", null) &&
      sessionStorage.setItem("user", null);
  }, [state.currentUser]);

  return (
    <AuthContext.Provider value={{ user: state.currentUser, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
export { AuthContextProvider, AuthContext };
