import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { RiCloseFill } from "react-icons/ri";
import getPrice from "../utils/getPrice";
import { FirestoreContext } from "../context/FirestoreContext";
import { CartContext } from "../context/CartContext";
import { useContext } from "react";
import { useEffect, useState } from "react";

const Drawer = ({ children }) => {
  const { handleCartClick } = useContext(CartContext);
  const { state: firestoreState, dispatch: firestoreDispatch } =
    useContext(FirestoreContext);
  const [totalPrice, setTotalPrice] = useState(0);

  console.log(firestoreState.cartItems);
  useEffect(() => {
    if (!firestoreState.isLoading && firestoreState.cartItems) {
      // const games = firestoreState.cartItems.data().games;
      const sum = firestoreState.cartItems
        .data()
        .games.reduce((accumulator, currentGame) => {
          return accumulator + Number(getPrice(currentGame.name));
        }, 0);
      setTotalPrice(sum);
    }
  }, [firestoreState.cartItems]);

  const cartList =
    !firestoreState.isLoading &&
    firestoreState.cartItems &&
    firestoreState.cartItems.data().games.map((game, index) => {
      return (
        <li
          className="bg-[#262626] rounded-lg p-4 flex gap-2 items-center"
          key={index}
        >
          <span className="text-sm font-semibold flex-auto">{game.name}</span>
          <span className="text-sm font-medium text-zinc-500">
            ${getPrice(game.name)}
          </span>
          <button className="btn btn-circle btn-xs text-base border-0 text-zinc-300 bg-zinc-700 hover:bg-zinc-700/50">
            <RiCloseFill
              onClick={() => handleCartClick("orders", "delete", game)}
            />
          </button>
        </li>
      );
    });

  return (
    <div className="drawer drawer-end">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">{children}</div>
      <div className="drawer-side">
        <label htmlFor="my-drawer" className="drawer-overlay"></label>
        <div className="flex flex-col flex-wrap gap-5 p-6 w-96 bg-[#1f1f1c] text-base-content">
          <div className="" id="header">
            <div className="flex justify-between items-center">
              <span className="font-extrabold text-3xl text-white">
                {!firestoreState.isLoading && firestoreState.cartItems
                  ? firestoreState.cartItems.data().games.length == 1
                  ? `${firestoreState.cartItems.data().games.length} game`
                  : `${firestoreState.cartItems.data().games.length} games`
                  : "0 game"}
              </span>
              <span className="font-semibold text-zinc-500 hover:text-zinc-300 transition-colors duration-200 cursor-pointer"
              onClick={() => handleCartClick("orders")}
              >Clear</span>
            </div>
          </div>
          <ul className="flex flex-col flex-auto gap-3" id="content">
            {cartList}
          </ul>
          <div className="flex justify-between" id="footer">
            <span className="font-bold self-center text-zinc-500">
              Total: ${firestoreState.cartItems ? totalPrice : "0.00"}
            </span>
            <Link
              to="/"
              className="flex gap-2 items-center align-middle text-white hover:text-primary text-xl font-semibold transition-colors duration-200"
            >
              <span className="">Checkout</span>
              <FaArrowRight />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Drawer;
