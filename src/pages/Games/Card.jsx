import {
  FaXbox,
  FaPlaystation,
  FaWindows,
  FaPlus,
  FaHeart,
} from "react-icons/fa";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { SiNintendoswitch } from "react-icons/si";
import getPrice from "../../utils/getPrice";

const Card = ({
  id,
  name,
  image,
  metacritic,
  parent_platform,
  released,
  genres,
  isHearted,
  handleHeartClick
}) => {
  const { user } = useContext(AuthContext);

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

  const platform = {
    PC: null,
    PlayStation: null,
    Xbox: null,
    Nintendo: null,
  };
  parent_platform.forEach((item) => {
    platform[item.platform.name] = true;
  });

  const metacriticStyles =
    metacritic > 75
      ? "flex rounded-xl border-2 border-success text-success font-bold py-1 px-2 h-fit"
      : !metacritic
      ? "hidden"
      : "flex rounded-xl border-2 border-warning text-warning font-bold py-1 px-2 h-fit";

  return (
    <div
      className="card card-compact col-span-12 md:col-span-6 lg:col-span-4 2xl:col-span-3 h-fit bg-zinc-800 shadow-xl"
      key={id}
    >
      <figure className="relative aspect-[16/9] max-h-min overflow-hidden">
        <img src={image} alt={name} className="" />
        <button
          className={isHearted[name] ? "p-3 bg-black absolute top-3 right-3 rounded-full text-red-500 transition-colors"
        : "p-3 bg-black absolute top-3 right-3 rounded-full text-white transition-all active:scale-90 hover:text-red-500"}
          onClick={() => handleHeartClick(obj, "wishlist", isHearted[name], name)}
        >
          <FaHeart className=" text-sm" />
        </button>
      </figure>
      <div className="p-5">
        <div className="flex justify-between text-white py-1">
          <div className="flex text-zinc-400 hover:text-primary transition-colors duration-200 cursor-pointer">
            <span className="text-sm font-semibold  mr-2 self-center">
              Add to cart
            </span>
            <FaPlus className="self-center" />
          </div>
          <span className="font-semibold">${getPrice(name)}</span>
        </div>
        <div className="flex justify-between gap-2">
          <span className="card-title text-white font-bold">{name}</span>
          <div className={metacriticStyles}>
            <span className="text-xs">{metacritic}</span>
          </div>
        </div>
        <div className="flex justify-between my-2 text-white">
          <div className="flex gap-2">
            {platform.PC && <FaWindows className="self-center" />}
            {platform.PlayStation && <FaPlaystation className="self-center" />}
            {platform.Xbox && <FaXbox className="self-center" />}
            {platform.Nintendo && <SiNintendoswitch className="self-center" />}
          </div>
        </div>
        <ul className="text-xs text-zinc-400">
          <li>Released: {released}</li>
          <li>Genres: {genreList}</li>
        </ul>
      </div>
    </div>
  );
};

export default Card;
