import {
  FaXbox,
  FaPlaystation,
  FaWindows,
  FaPlus,
  FaHeart,
} from "react-icons/fa";
import { SiNintendoswitch } from "react-icons/si";
import getPrice from "../../utils/getPrice";
import { faker } from '@faker-js/faker';

const Card = ({ id, name, image, platform, metacritic, released, genres }) => {
  const genreList = genres.map((genre, index, arr) =>
    arr.length - 1 == index ? `${genre.name}` : `${genre.name}, `
  );
  const metacriticStyles =
    metacritic > 75
      ? "flex rounded-xl border-2 border-success text-success font-bold py-1 px-2 h-fit"
      : !metacritic
      ? "hidden"
      : "flex rounded-xl border-2 border-warning text-warning font-bold py-1 px-2 h-fit";

  return (
    <div
      className="card card-compact col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3 h-fit bg-zinc-800 shadow-xl"
      key={id}
    >
      <figure className="relative aspect-[16/9] max-h-min overflow-hidden">
        <img src={image} alt={name} className="" />
        <button className="p-3 bg-black absolute top-3 right-3 rounded-full text-white transition-all active:scale-90 hover:text-red-500">
          <FaHeart className=" text-sm" />
        </button>
      </figure>
      <div className="p-5">
        <div className="flex justify-between text-white py-1">
          <div className="flex hover:text-primary-focus transition-colors duration-200 cursor-pointer">
            <span className="text-sm font-semibold  mr-2 self-center">
              Add to cart
            </span>
            <FaPlus className="self-center" />
          </div>
          <span className="font-semibold">${getPrice(name)}</span>
        </div>
        <div className="flex justify-between gap-2">
          <span className="card-title text-white">{name}</span>
          <div className={metacriticStyles}>
            <span className="text-xs">{metacritic}</span>
          </div>
        </div>
        <div className="flex justify-between my-2">
          <div className="flex gap-2">
            {<FaWindows className="self-center" />}
            <FaPlaystation className="self-center" />
            <FaXbox className="self-center" />
            <SiNintendoswitch className="self-center" />
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
