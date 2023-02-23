import createDoc from "../utils/createDoc";
import modifyDoc from "../utils/modifyDoc";
import { createContext, useContext } from "react";
import { FirestoreContext } from "./FirestoreContext";

const CartContext = createContext(null);

const CartContextProvider = ({children}) => {
  const { state: firestoreState, dispatch: firestoreDispatch } = useContext(FirestoreContext);
  
  const handleCartClick = (docCollection, action, game) => {
    if (action == "add") {
      if (!firestoreState.cartItems) {
        const obj = {
          isCompleted: false,
          user: game.user,
          games: [game],
        };
    
        firestoreDispatch({ type: "UPDATE_IS_LOADING", payload: true });
        createDoc(obj, docCollection);
      } else {
        const obj = {
          ...firestoreState.cartItems.data(),
          games: [
            ...firestoreState.cartItems.data().games,
            game,
          ]
        }
        firestoreDispatch({ type: "UPDATE_IS_LOADING", payload: true });
        modifyDoc(obj, docCollection, firestoreState.cartItems.id);
      }
    } else if (action == "delete") {
      const filteredGames = firestoreState.cartItems
        .data()
        .games.filter((gameN) => gameN.name != game.name);
  
      const newObj = {
        ...firestoreState.cartItems.data(),
        games: filteredGames,
      };
      modifyDoc(newObj, docCollection, firestoreState.cartItems.id);
    }
  };
  return (
    <CartContext.Provider value={{handleCartClick}}>
      {children}
    </CartContext.Provider>
  )
}

export {CartContextProvider, CartContext}