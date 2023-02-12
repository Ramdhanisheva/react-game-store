import { useEffect } from "react";
import { useReducer } from "react";
import { createContext } from "react";

const AuthReducer = (state, action) => {
  switch (action.type) {
    case "login":
      return {
        currentUser: action.payload,
      };
    case "logout":
      return {
        currentUser: null,
      };
    default:
      return state;
  }
};

const AuthContext = createContext(null)
const initialState = {
    currentUser: JSON.parse(localStorage.getItem('user')) || null
}

const AuthContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(AuthReducer, initialState)

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(state.currentUser))
    }, [state.currentUser])

    return(
        <AuthContext.Provider value={{user: state.currentUser , dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}

export {AuthContextProvider, AuthContext}
