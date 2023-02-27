import { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Navbar from "../../components/Navbar";
import Spinner from "../../components/Spinner";
import {
  FaArrowLeft,
  FaAngleDown,
  FaAngleUp,
  FaPlus,
  FaHeart,
  FaCheck
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { FirestoreContext } from "../../context/FirestoreContext";
import { CartContext } from "../../context/CartContext";

const GameDetails = () => {
  const { state: firestoreState, dispatch: firestoreDispatch } =
    useContext(FirestoreContext);
  const { handleHeartClick, handleCartClick } = useContext(CartContext);
  const [toggle, setToggle] = useState(true);

  const { id } = useParams();
  const url = `https://api.rawg.io/api/games/${id}?key=da8b78f38c134484a249b5f177270923`;

  const sendRequest = async (url) => {
    return await fetch(url).then((res) => res.json());
  };

  const { isLoading, isError, data } = useQuery({
    queryKey: ["gameDetails"],
    queryFn: () => sendRequest(url),
  });

  const obj = !isLoading && !isError && {
    id: id,
    name: data.name,
    image: data.background_image,
    metacritic: data.metacritic,
    parent_platform: data.parent_platforms,
    released: data.released,
    genres: data.genres,
  };

  const Loader = () => {
    return (
      <div className="flex flex-grow justify-center items-center">
        <Spinner size={"w-20 h-20"} />
      </div>
    );
  };

  const Error = () => {
    return (
      <div className="flex flex-grow justify-center items-center">
        <span className="text-xl font-semibold">Error!</span>
      </div>
    );
  };
  return (
    <div className="flex flex-col min-h-screen mx-4 md:mx-6 lg:mx-10 4xl:max-w-[1980px] 4xl:mx-auto overflow-visible">
      <Navbar />
      {isLoading || firestoreState.isLoading ? (
          <Loader />
      ) : isError ? (
        <Error />
      ) : (
        <>
          <div className="flex justify-between items-center py-5">
            <div>
              <Link to={"/games"}>
                <span className="flex items-center gap-2 text-2xl font-semibold text-white hover:text-primary transition-colors duration-200">
                  <FaArrowLeft />
                  Store
                </span>
              </Link>
            </div>
            <div>
              <h1 className="text-6xl font-extrabold text-white">
                {data.name}
              </h1>
            </div>
          </div>
          <div className="grid grid-cols-12 gap-8 mb-3 md:mb-0">
            <div className="col-span-12 lg:col-span-8 bg-purple-600 rounded-2xl h-[700px]"></div>
            <div className="col-span-12 lg:col-span-4 flex flex-col justify-between gap-8">
              <div>
                <div className="relative">
                  <div className="h-[50px] w-full bg-gradient-to-b from-transparent to-[#222222] absolute bottom-0"></div>
                  <div className="p-8 flex flex-col gap-4 tracking-wider max-h-[21rem] overflow-y-scroll bg-[#222222] rounded-t-2xl">
                    <span className="text-2xl font-extrabold text-white">
                      About
                    </span>
                    <p className="text-[14px] font-medium leading-loose tracking-tighter">
                      {data.description_raw}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col px-8 py-6 bg-[#2d2d2e] rounded-b-2xl">
                  {!toggle && (
                    <ul className="flex flex-col text-sm leading-loose font-medium text-zinc-400">
                      <li>
                        website:{" "}
                        <a href={data.website} className="link" target={"_blank"} rel="noopener noreferrer">
                          {data.website}
                        </a>
                      </li>
                      <li>Released: {data.released}</li>
                      <li>
                        Platforms :
                        {data.parent_platforms
                          .map((platform) => platform.platform.name)
                          .join(", ")}
                      </li>
                      <li>
                        Genres:{" "}
                        {data.genres.map((genre) => genre.name).join(", ")}
                      </li>
                      <li>
                        Developers:{" "}
                        {data.developers
                          .map((developer) => developer.name)
                          .join(", ")}
                      </li>
                      <li>
                        Publishers:{" "}
                        {data.publishers
                          .map((publisher) => publisher.name)
                          .join(", ")}
                      </li>
                    </ul>
                  )}
                  <button
                    className="flex self-end items-center first-of-type:font-medium gap-2"
                    onClick={() => setToggle((prevState) => !prevState)}
                  >
                    {toggle ? "More" : "Hide"}
                    {toggle ? <FaAngleDown /> : <FaAngleUp />}
                  </button>
                </div>
              </div>
              <div className="flex justify-between p-5 bg-[#222222] rounded-2xl order-first lg:order-last">
                <div className="flex gap-4 items-center text-zinc-400">
                  <span className="font-bold text-lg">$23.93</span>
                  <FaHeart
                    className={`text-2xl transition-colors duration-200 cursor-pointer ${
                      firestoreState.wishlist.find(
                        (game) => game.data().id == id
                      )
                        ? "text-red-500"
                        : "transition-all active:scale-90 hover:text-red-500"
                    }`}
                    onClick={() => handleHeartClick(obj, "wishlist", data.name)}
                  />
                </div>
                {firestoreState.cartItems.data().games.find(game => game.id == id)
                ? <span className="flex items-center gap-2 text-xl font-semibold text-success">
                  Added
                  <FaCheck />
                </span>
              : <button className="flex items-center gap-2 text-xl font-semibold text-zinc-400 hover:text-primary transition-colors duration-200"
              onClick={() => handleCartClick("orders", "add", obj)}
              >
                Add to cart
                <FaPlus />
              </button>}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default GameDetails;