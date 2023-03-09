import { useContext } from "react";
import { FaGamepad, FaGithub, FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FirestoreContext } from "../context/FirestoreContext";

const Navbar = ({ dispatch }) => {
  const { state: firestoreState } = useContext(FirestoreContext);

  const handleOnChange = (e) => {
    if (!dispatch) {
      return;
    }
    const { value } = e.target;
    dispatch({ type: "UPDATE_SEARCH_QUERY", payload: value });
    dispatch({ type: "FILTER_BY_SEARCH_QUERY", payload: value });
  };

  return (
    <div className="modified-navbar px-0 flex-wrap justify-between text-white">
      <div className="">
        <Link
          to="/"
          className="flex p-3 active:scale-95 transition ease-in-out order-first md:order-first"
        >
          <FaGamepad className="self-center mr-2 " />
          <h2 className="font-bold text-xl">GameStore</h2>
        </Link>
      </div>
      <div className="w-full md:w-[26rem] order-last md:order-1 justify-center">
        <input
          type="text"
          placeholder="Search games..."
          className="input input-ghost bg-zinc-800 border-0 focus:border-0 focus:ring-0 focus:bg-[#343438] text-sm transition-all ease-in-out duration-200 w-full md:w-3/6 focus:w-full input-sm"
          onChange={(e) => handleOnChange(e)}
        />
        <div className="ml-3 text-zinc-400 hover:text-white active:scale-90 transition ease-in-out cursor-pointer">
          <FaSearch />
        </div>
      </div>
      <div className="flex-none md:order-last">
        <div>
          <a
            className="capitalize btn btn-ghost pr-0 md:pr-4"
            href="https://github.com/Armadillidiid"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub className="text-white text-md lg:text-lg mr-1 md:mr-2" />
            <h3 className="font-bold">armadillidiid</h3>
          </a>
        </div>
        <label
          tabIndex={0}
          className="btn btn-ghost btn-circle"
          htmlFor="my-drawer"
          data-test-id="drawer"
        >
          <div className="indicator">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <span className="badge badge-sm badge-success indicator-item">
              {!firestoreState.isLoading && firestoreState.cartItems
                ? firestoreState.cartItems.data().games.length
                : 0}
            </span>
          </div>
        </label>
      </div>
    </div>
  );
};

export default Navbar;
