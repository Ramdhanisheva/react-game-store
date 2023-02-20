import { useEffect } from "react";
import { useReducer, createContext, useContext } from "react";
import { db } from "../utils/firebase";
import { AuthContext } from "./AuthContext";
import {
  collection,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";

const FirestoreContext = createContext(null)

const FirestoreContextProvider = ({ children }) => {
  const initialState = {
    wishlist: [],
    cartItems: [],
    orders: [],
    isLoading: true,
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "UPDATE_WISHLIST":
        return {
          ...state,
          wishlist: action.payload,
          isLoading: false
        };
      case "UPDATE_CART_ITEMS":
        return {
          ...state,
          cartItems: action.payload,
        };
      case "UPDATE_ORDERS":
        return {
          ...state,
          orders: action.payload,
        };
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const { user } = useContext(AuthContext);
  useEffect(() => {
    const q = query(collection(db, "wishlist"), where("user", "==", user.uid));
    const unsub = onSnapshot(q, (snapshot) => {
      const data = [];
      snapshot.docs.forEach((doc) => {
        data.push(doc);
      });
      dispatch({ type: "UPDATE_WISHLIST", payload: data });
    });

    return () => {
      unsub();
    };
  }, []);

  return (
    <FirestoreContext.Provider value={{ state: state, dispatch }}>
      {children}
    </FirestoreContext.Provider>
  );
};

export { FirestoreContextProvider, FirestoreContext};
