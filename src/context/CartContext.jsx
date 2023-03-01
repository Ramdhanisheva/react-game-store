import createDoc from "../utils/createDoc";
import modifyDoc from "../utils/modifyDoc";
import eraseDoc from "../utils/eraseDoc";
import { createContext, useContext } from "react";
import { FirestoreContext } from "./FirestoreContext";
import { AuthContext } from "./AuthContext";

const CartContext = createContext(null);

const CartContextProvider = ({ children }) => {
  const { state: firestoreState, dispatch: firestoreDispatch } =
    useContext(FirestoreContext);
  const { user } = useContext(AuthContext);

  const handleCartClick = (docCollection, action, game) => {
    console.log(game);
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
          games: [...firestoreState.cartItems.data().games, game],
        };
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
    } else {
      const newObj = {
        ...firestoreState.cartItems.data(),
        games: [],
      };
      modifyDoc(newObj, docCollection, firestoreState.cartItems.id);
    }
  };

  const handleHeartClick = (obj, docCollection, name) => {
    const isHearted = firestoreState.wishlist.find(
      (game) => game.data().name === name
    );
    const newObj = {
      ...obj,
      user: user.uid,
    };
    if (isHearted) {
      firestoreDispatch({ type: "UPDATE_IS_LOADING", payload: true });
      const found = firestoreState.wishlist.find(
        (heartedGame) => heartedGame.data().name == name
      );
      eraseDoc("wishlist", found.id);
    } else {
      firestoreDispatch({ type: "UPDATE_IS_LOADING", payload: true });
      createDoc(newObj, docCollection);
    }
  };

  return (
    <CartContext.Provider value={{ handleCartClick, handleHeartClick }}>
      {children}
    </CartContext.Provider>
  );
};

export { CartContextProvider, CartContext };
