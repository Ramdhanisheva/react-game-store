import React from "react";
import { useEffect, useReducer } from "react";
import Navbar from "../../components/Navbar";
import genres from "./genres";
import filters from "./filters";
import Card from "./Card";
import { fetchGames } from "../../utils/fetchGames";
import { reducer, initialState } from "./GameReducer";
import eraseDoc from "../../utils/eraseDoc";
import createDoc from "../../utils/createDoc";
import { useContext } from "react";
import { FirestoreContext } from "../../context/FirestoreContext";


const Games = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { games, queriedGames, filterBy, searchQuery, isLoading, isSelected, isHearted, isInitialRender } = state;
  const { state:firestoreState } = useContext(FirestoreContext)

  console.log(games);

  const filterSort = (filter) => {
    if (filter == "metacritic") {
      dispatch({ type: "SORT_BY_METACRITIC", payload: filter });
    } else if (filter == "release date") {
      dispatch({ type: "SORT_BY_RELEASE_DATE", payload: filter });
    } else {
      dispatch({ type: "SORT_BY_WISHLIST", payload: {filter: filter, wishlist: firestoreState.wishlist} });
    }
  }

  useEffect(() => {
    let ignore = false;

    const sendRequest = async () => {
      const data = await fetchGames(
        "https://api.rawg.io/api/games?page_size=40&key=da8b78f38c134484a249b5f177270923"
      );

      if (!ignore) {
        dispatch({
          type: "SET_GAMELIST",
          payload: {
            games: data.results,
          },
        });
      }
    };

    sendRequest();

    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    // Re-render wishlist games if filter active
    if (isInitialRender) {
      dispatch({type: "UPDATE_IS_INITIAL_RENDER", payload: false})
    } else {
      if (filterBy == "wishlist") {
        !firestoreState.isLoading && filterSort("wishlist")
      }
    }

    dispatch({type: "UPDATE_IS_HEARTED", payload: firestoreState.wishlist})

  }, [firestoreState.wishlist])
  

  const handleFilterClick = (filter) => {
    console.log(`Sort by ${filter}`);
    if (!firestoreState.isLoading) {
      dispatch({ type: "SET_CURRENT_SELECTED_IS_FILTER_BY", payload: filter });
      filterSort(filter)
    }
  };

  const handleGenreClick = (genre) => {
    console.log(`Sort by ${genre}`);
    dispatch({ type: "FILTER_BY_GENRE", payload: genre });
    dispatch({ type: "SET_CURRENT_SELECTED_IS_FILTER_BY", payload: genre });
  };

  const handleHeartClick = (obj, docCollection, isHearted, name) => {
    if (isHearted) {
      const found = firestoreState.wishlist.find(heartedGame => heartedGame.data().name == name)
      eraseDoc("wishlist", found.id)
    } else {
      dispatch({type: "UPDATE_IS_LOADING", payload: true})
      createDoc(obj, docCollection);
    }
  };

  const filterList = filters.map((filter, index) => {
    return (
      <li
        key={index}
        className="cursor-pointer group disabled"
        onClick={() => handleFilterClick(filter.name)}
      >
        <button
          className="flex text-lg p-1"
        >
          <div
            className={
              isSelected == filter.name
                ? "p-3 text-xl mr-2 rounded-md bg-white text-black transition-colors duration-200 ease-in-out"
                : "p-3 text-xl mr-2 rounded-md bg-zinc-800 text-white group-hover:text-black group-hover:bg-white transition-colors duration-200 ease-in-out"
            }
          >
            {filter.icon}
          </div>
          <span className="self-center capitalize text-white">
            {filter.name}
          </span>
        </button>
      </li>
    );
  });

  const genreList = genres.map((genre, index) => {
    return (
      <li
        key={index}
        className="cursor-pointer group"
        onClick={() => handleGenreClick(genre.name)}
      >
        <button className="flex text-lg p-1">
          <div
            className={
              isSelected == genre.name
                ? "p-3 text-xl mr-2 rounded-md bg-white text-black  transition-colors duration-200 ease-in-out"
                : "p-3 text-xl mr-2 rounded-md bg-zinc-800 text-white group-hover:text-black group-hover:bg-white transition-colors duration-200 ease-in-out"
            }
          >
            {genre.icon}
          </div>
          <span className="self-center capitalize text-white">
            {genre.name == "rpg" ? genre.name.toUpperCase() : genre.name}
          </span>
        </button>
      </li>
    );
  });

  return (
    <>
      <Navbar dispatch={dispatch} />
      <div className="mx-2 md:mx-5 lg:mx-10 4xl:max-w-[1980px] 4xl:mx-auto">
        <div className="grid grid-cols-12 mt-8 relative">
          <div className="hidden md:block md:col-span-3 lg:col-span-2 h-screen p-4 bg-zinc-900 sticky top-0 truncate">
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
                Filter by:
                <b className="ml-2">
                  {filterBy
                    ? filterBy == "rpg"
                      ? filterBy.toUpperCase()
                      : filterBy
                    : "none"}
                </b>
              </button>
              <button
                className="btn bg-zinc-800 hover:bg-zinc-700 font-bold capitalize"
                onClick={() => {
                  dispatch({ type: "CLEAR_FILTER" });
                }}
              >
                Clear filter
              </button>
            </div>
            <div className="grid grid-cols-12 gap-6 p-4">
              {searchQuery == "" 
              ? (games &&
                games.map((game, index) => (
                  <Card
                    key={index}
                    id={index}
                    name={game.name}
                    image={game.background_image}
                    parent_platform={game.parent_platforms}
                    metacritic={game.metacritic}
                    released={game.released}
                    genres={game.genres}
                    isHearted={isHearted}
                    handleHeartClick={handleHeartClick}
                    isLoading={isLoading}
                  />
                )))
              : (queriedGames &&
                queriedGames.map((game, index) => (
                  <Card
                    key={index}
                    id={index}
                    name={game.name}
                    image={game.background_image}
                    parent_platform={game.parent_platforms}
                    metacritic={game.metacritic}
                    released={game.released}
                    genres={game.genres}
                    isHearted={isHearted}
                    handleHeartClick={handleHeartClick}
                    isLoading={isLoading}
                  />
                )))
            }
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Games;