import React from "react";
import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import { FaInbox, FaStar, FaCalendarAlt } from "react-icons/fa";
import genres from "./genres";
import filters from "./filters";
import Card from "./Card";
import {fetchGames} from "../../utils/fetchGames"


const Games = () => {
  const [games, setGames] = useState(null)

  useEffect(() => {
    let ignore = false
    const sendRequest = async () => {
      const data = await fetchGames("https://api.rawg.io/api/games?page_size=40&key=da8b78f38c134484a249b5f177270923")

      if (!ignore) {
        setGames(data.results)
      }
    }
    sendRequest()

    return () => {
      ignore = true
    }
  }, [])
  
  const handleFilterClick = () => {
    return;
  };
  
  const handleGenreClick = () => {
    return;
  };
  
  const filterList = filters.map((filter, index) => {
    return (
      <li key={index} className="filter-list">
        <button className="flex text-lg p-1" onClick={handleFilterClick}>
          <div className="p-3 text-xl mr-2 rounded-md bg-zinc-800 text-white">
            {filter.icon}
          </div>
          <span className="self-center capitalize text-white">{filter.name}</span>
        </button>
      </li>
    );
  });
  
  console.log(genres)
  const genreList = genres.map((genre, index) => {
    return (
      <li key={index} className="flex text-lg p-1 cursor-pointer genre-list" onClick={handleFilterClick}>
        <button className="">
          <div className="p-3 text-xl mr-2 rounded-md bg-zinc-800 text-white">
            {genre.icon}
          </div>
        </button>
          <span className="self-center capitalize text-white ">
            {genre.name == "rpg" ? genre.name.toUpperCase() : genre.name}
          </span>
      </li>
    );
  });

  return (
    <>
      <Navbar />
      <div className="mx-2 md:mx-5 lg:mx-10 4xl:max-w-[1980px] 4xl:mx-auto">
        <div className="grid grid-cols-12 mt-8 relative">
          <div className="hidden md:block md:col-span-3 lg:col-span-2 h-screen p-4 bg-zinc-900 sticky top-0">
            <div className="mb-5">
              <h2 className="font-semibold text-white text-2xl mb-4">
                Filters
              </h2>
              <ul>{filterList}</ul>
            </div>
            <div>
              <h2 className="font-semibold text-white text-2xl mb-4">Genres</h2>
              <ul>{genreList}</ul>
            </div>
          </div>
          <div className="col-span-12 md:col-span-9 lg:col-span-10">
            <div className="p-4">
              <h2 className="text-5xl font-bold text-white mb-2">
                Trending and interesting
              </h2>
              <span>Based on player counts and release date</span>
            </div>
            <div className="p-4 flex gap-2">
              <button className="btn bg-zinc-800 hover:bg-zinc-700 font-medium capitalize">
                Filter by:<b className="ml-2">Adventure</b>
              </button>
              <button className="btn bg-zinc-800 hover:bg-zinc-700 font-bold capitalize">
                Clear filter
              </button>
            </div>
            <div className="grid grid-cols-12 gap-6 p-4">
              {games && games.map((game, index) => (
                <Card
                key={index}
                id={index}
                name={game.name}
                image={game.background_image}
                platform={game.parent_platforms}
                metacritic={game.metacritic}
                released={game.released}
                genres={game.genres}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Games;