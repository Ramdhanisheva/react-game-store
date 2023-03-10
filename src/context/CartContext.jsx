import { createContext, useContext } from "react";
import createDoc from "../utils/createDoc";
import eraseDoc from "../utils/eraseDoc";
import modifyDoc from "../utils/modifyDoc";
import { AuthContext } from "./AuthContext";
import { FirestoreContext } from "./FirestoreContext";
import logger from "../utils/logger";

const CartContext = createContext(null);

const CartContextProvider = ({ children }) => {
  const { state: firestoreState, dispatch: firestoreDispatch } =
    useContext(FirestoreContext);
  const { user } = useContext(AuthContext);

  const handleCartClick = (docCollection, action, game) => {
    logger.debug(game);
    if (action == "add") {
      if (!firestoreState.cartItems) {
        const obj = {
          isCompleted: false,
          user: user.uid,
          games: [game],
        };

        logger.debug(obj);
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
    } else if (action == "complete_order") {
      const obj = {
        ...firestoreState.cartItems.data(),
        isCompleted: true,
      };
      modifyDoc(obj, docCollection, firestoreState.cartItems.id);
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
