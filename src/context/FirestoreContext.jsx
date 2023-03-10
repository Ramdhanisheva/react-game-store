import { useEffect } from "react";
import { useReducer, createContext, useContext } from "react";
import { db } from "../utils/firebase";
import { AuthContext } from "./AuthContext";
import { collection, query, where, onSnapshot } from "firebase/firestore";

const FirestoreContext = createContext(null);

const FirestoreContextProvider = ({ children }) => {
  const initialState = {
    wishlist: null,
    cartItems: null,
    orders: null,
    isLoading: true,
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "UPDATE_WISHLIST":
        return {
          ...state,
          wishlist: action.payload,
          isLoading: false,
        };
      case "UPDATE_ORDERS":
        return {
          ...state,
          orders: action.payload.ordersDocs,
          cartItems: action.payload.cartItemsDocs[0],
          isLoading: false,
        };
      case "UPDATE_IS_LOADING":
        return {
          ...state,
          isLoading: action.payload,
        };
      case "default":
        throw new Error("Unknown action");
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const { user } = useContext(AuthContext);
  useEffect(() => {
    if (user) {
      const wishlistQuery = query(
        collection(db, "wishlist"),
        where("user", "==", user?.uid)
      );
      const ordersQuery = query(
        collection(db, "orders"),
        where("user", "==", user?.uid)
      );

      const unsubWishlist = onSnapshot(wishlistQuery, (snapshot) => {
        const data = [];
        snapshot.docs.forEach((doc) => {
          data.push(doc);
        });
        dispatch({ type: "UPDATE_WISHLIST", payload: data });
      });

      const unsubOrders = onSnapshot(ordersQuery, (snapshot) => {
        const ordersDocs = snapshot.docs.filter(
          (doc) => doc.data().isCompleted == true
        );
        const cartItemsDocs = snapshot.docs.filter(
          (doc) => doc.data().isCompleted == false
        );
        dispatch({
          type: "UPDATE_ORDERS",
          payload: { ordersDocs: ordersDocs, cartItemsDocs: cartItemsDocs },
        });
      });

      return () => {
        unsubWishlist();
        unsubOrders();
      };
    }
  }, [user]);

  return (
    <FirestoreContext.Provider value={{ state: state, dispatch }}>
      {children}
    </FirestoreContext.Provider>
  );
};

export { FirestoreContextProvider, FirestoreContext };
