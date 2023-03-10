import { motion } from "framer-motion";
import { useContext } from "react";
import {
  FaCheck,
  FaHeart,
  FaPlaystation,
  FaPlus,
  FaWindows,
  FaXbox,
} from "react-icons/fa";
import { SiNintendoswitch } from "react-icons/si";
import { Link } from "react-router-dom";
import Spinner from "../../components/Spinner";
import { AuthContext } from "../../context/AuthContext";
import { CartContext } from "../../context/CartContext";
import { FirestoreContext } from "../../context/FirestoreContext";
import getPrice from "../../utils/getPrice";

const Card = ({
  id,
  name,
  image,
  metacritic,
  parent_platform,
  released,
  genres,
  handleHeartClick,
  isLoading,
}) => {
  const { user } = useContext(AuthContext);
  const { handleCartClick } = useContext(CartContext);
  const { state: firestoreState } = useContext(FirestoreContext);

  const obj = {
    user: user.uid,
    id: id,
    name: name,
    image: image,
    metacritic: metacritic,
    parent_platform: parent_platform,
    released: released,
    genres: genres,
  };

  const genreList = genres.map((genre, index, arr) =>
    arr.length - 1 == index ? `${genre.name}` : `${genre.name}, `
  );

  const animation = {
    in: { opacity: 0 },
    animate: { opacity: 1 },
  };

  const platform = {
    PC: null,
    PlayStation: null,
    Xbox: null,
    Nintendo: null,
  };
  parent_platform.forEach((item) => {
    platform[item.platform.name] = true;
  });

  const metacriticStyles = // firestoreState.cartItems
    metacritic > 75
      ? "flex rounded-xl border-2 border-success text-success font-bold py-1 px-2 h-fit"
      : !metacritic
      ? "hidden"
      : "flex rounded-xl border-2 border-warning text-warning font-bold py-1 px-2 h-fit";

  return (
    <div
      className="card card-compact col-span-12 md:col-span-6 lg:col-span-4 2xl:col-span-3 h-fit bg-zinc-800 shadow-xl transition-all hover:bg-zinc-700/[.55] hover:scale-[1.02] duration-300"
      key={id}
      data-test-id={`card-${id}`}
    >
      <motion.div
        variants={animation}
        initial={"in"}
        animate={"animate"}
        className="rounded-xl"
      >
        <figure className="relative aspect-[16/9] max-h-min overflow-hidden">
          <Link to={`/games/${id}`}>
            <img src={image} alt={name} />
          </Link>
          {!firestoreState.isLoading ? (
            firestoreState.wishlist &&
            firestoreState.wishlist.find(
              (game) => game.data().name === name
            ) ? (
              <button
                className="p-3 bg-black absolute top-3 right-3 rounded-full text-red-500 transition-colors"
                onClick={() => handleHeartClick(obj, "wishlist", name)}
                data-test-id="wishlist"
              >
                <FaHeart className=" text-sm" />
              </button>
            ) : (
              <button
                className="p-3 bg-black absolute top-3 right-3 rounded-full text-white transition-all active:scale-90 hover:text-red-500"
                onClick={() => handleHeartClick(obj, "wishlist", name)}
              >
                <FaHeart className=" text-sm" />
              </button>
            )
          ) : (
            <Spinner size={"w-6 h-6"} />
          )}
        </figure>
        <div className="p-5">
          <div className="flex justify-between text-white py-1">
            {firestoreState.isLoading ? (
              <Spinner size="w-4 h-4" />
            ) : firestoreState.cartItems &&
              firestoreState.cartItems
                .data()
                .games.find((game) => game.name === name) ? (
              <div className="flex items-center text-success transition-colors cursor-default">
                <span className="text-sm font-semibold mr-2">Added</span>
                <FaCheck />
              </div>
            ) : (
              <button
                className="flex text-zinc-400 hover:text-primary transition-colors duration-200 cursor-pointer"
                onClick={() => handleCartClick("orders", "add", obj)}
                data-test-id="cart"
              >
                <span className="text-sm font-semibold  mr-2 self-center">
                  Add to cart
                </span>
                <FaPlus className="self-center" />
              </button>
            )}
            <span className="font-semibold">${getPrice(name)}</span>
          </div>
          <div className="flex justify-between gap-2">
            <span
              className="card-title text-white font-bold"
              data-test-id="title-name"
            >
              {name}
            </span>
            <div className={metacriticStyles}>
              <span className="text-xs" data-test-id="metacritic">
                {metacritic}
              </span>
            </div>
          </div>
          <div className="flex justify-between my-2 text-white">
            <div className="flex gap-2">
              {platform.PC && <FaWindows className="self-center" />}
              {platform.PlayStation && (
                <FaPlaystation className="self-center" />
              )}
              {platform.Xbox && <FaXbox className="self-center" />}
              {platform.Nintendo && (
                <SiNintendoswitch className="self-center" />
              )}
            </div>
          </div>
          <ul className="text-xs text-zinc-400">
            <li data-test-id="released">Released: {released}</li>
            <li data-test-id="genre">Genres: {genreList}</li>
          </ul>
        </div>
      </motion.div>
    </div>
  );
};

export default Card;

{
  /* <button
  className={
    !isLoading && firestoreState.wishlist
      ? firestoreState.wishlist.find((game) => game.data().name === name)
        ? "p-3 bg-black absolute top-3 right-3 rounded-full text-red-500 transition-colors hearted"
        : "p-3 bg-black absolute top-3 right-3 rounded-full text-white transition-all active:scale-90 hover:text-red-500"
      : "p-3 bg-black absolute top-3 right-3 rounded-full text-white btn-disabled cursor-not-allowed"
  }
  onClick={() => handleHeartClick(obj, "wishlist", name)}
>
  <FaHeart className=" text-sm" />
</button>; */
}
