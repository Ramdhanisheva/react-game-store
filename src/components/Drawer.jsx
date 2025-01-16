import React, { useContext, useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { RiCloseFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { FirestoreContext } from "../context/FirestoreContext";
import Transition from "./Transition";

const Drawer = ({ children }) => {
  const { handleCartClick, isOpen, setIsOpen } = useContext(CartContext);
  const { state: firestoreState, dispatch: firestoreDispatch } =
    useContext(FirestoreContext);
  const [isChecked, setIsChecked] = useState(false);

  // Membuat pesan yang akan dikirimkan ke WhatsApp tanpa harga
  const getCartMessage = () => {
    if (!firestoreState.isLoading && firestoreState.cartItems) {
      const cartItems = firestoreState.cartItems.data().games;
      return cartItems
        .map(game => game.name) // Hanya mengambil nama game, tanpa harga
        .join("\n");
    }
    return "No items in the cart";
  };

  const cartList =
    !firestoreState.isLoading &&
    firestoreState.cartItems &&
    firestoreState.cartItems.data().games.map((game, index) => {
      return (
        <li
          className="bg-[#262626] rounded-lg p-4 flex gap-2 items-center"
          key={index}
          data-test-id={`cartItem-${game.id}`}
        >
          <span className="text-sm font-semibold flex-auto">{game.name}</span>
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
      <input 
        id="my-drawer" 
        type="checkbox" 
        className="drawer-toggle"
        checked={isChecked} 
        onChange={() => setIsChecked(!isChecked)} 
      />
      <div className="drawer-content">{children}</div>
      <div className="drawer-side">
        <label htmlFor="my-drawer" className="drawer-overlay"></label>
        {isChecked && (
          <div
            className="flex flex-col flex-wrap gap-5 p-6 w-96 bg-[#1f1f1c] text-base-content"
          >
            <div id="header">
              <div className="flex justify-between items-center">
                <span className="font-extrabold text-3xl text-white">
                  {!firestoreState.isLoading && firestoreState.cartItems
                    ? firestoreState.cartItems.data().games.length == 1
                      ? `${firestoreState.cartItems.data().games.length} game`
                      : `${firestoreState.cartItems.data().games.length} games`
                    : "0 game"}
                </span>
                <span
                  className="font-semibold text-zinc-500 hover:text-zinc-300 transition-colors duration-200 cursor-pointer"
                  onClick={() => handleCartClick("orders")}
                >
                  Clear
                </span>
              </div>
            </div>
            <Transition
              styles="flex flex-col flex-auto gap-3"
              id="content"
              direction="right"
              duration={1}
              distance={50}
              bounce={0.5}
            >
              {cartList}
            </Transition>
            <div className="flex justify-between" id="footer">
              {/* Link ke WhatsApp dengan pesan yang hanya berisi nama game tanpa harga */}
              <a
                href={`https://wa.me/6285648852283?text=${encodeURIComponent(getCartMessage())}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex gap-2 items-center align-middle text-white hover:text-primary text-xl font-semibold transition-colors duration-200"
                data-test-id="checkout"
              >
                <span>Checkout via WhatsApp</span>
                <FaArrowRight />
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Drawer;
