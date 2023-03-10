import React, { useContext, useEffect, useReducer } from "react";
import Navbar from "../../components/Navbar";
import Transition from "../../components/Transition";
import { CartContext } from "../../context/CartContext";
import { FirestoreContext } from "../../context/FirestoreContext";
import { fetchGames } from "../../utils/fetchGames";
import Card from "./Card";
import filters from "./filters";
import { initialState, reducer } from "./GameReducer";
import genres from "./genres";
import logger from "../../utils/logger";

const Games = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    games,
    queriedGames,
    filterBy,
    searchQuery,
    isLoading,
    isSelected,
    isInitialRender,
  } = state;
  const { state: firestoreState, dispatch: firestoreDispatch } =
    useContext(FirestoreContext);
  const { handleHeartClick } = useContext(CartContext);

  logger.debug(games);

  const filterSort = (filter) => {
    if (filter == "metacritic") {
      dispatch({ type: "SORT_BY_METACRITIC", payload: filter });
    } else if (filter == "release date") {
      dispatch({ type: "SORT_BY_RELEASE_DATE", payload: filter });
    } else {
      dispatch({
        type: "SORT_BY_WISHLIST",
        payload: { filter: filter, wishlist: firestoreState.wishlist },
      });
    }
  };

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
  logger.debug(isLoading);

  useEffect(() => {
    // Re-render wishlist games if filter active
    if (isInitialRender) {
      dispatch({ type: "UPDATE_IS_INITIAL_RENDER", payload: false });
    } else {
      if (filterBy == "wishlist") {
        !firestoreState.isLoading && filterSort("wishlist");
      }
    }

    return () => {
      dispatch({ type: "UPDATE_IS_INITIAL_RENDER", payload: true });
    };
  }, [firestoreState.wishlist]);

  const handleFilterClick = (filter) => {
    logger.debug(`Sort by ${filter}`);
    if (
      !firestoreState.isLoading ||
      filter == "release date" ||
      filter == "metacritic"
    ) {
      dispatch({ type: "SET_CURRENT_SELECTED_IS_FILTER_BY", payload: filter });
      filterSort(filter);
    }
  };

  const handleGenreClick = (genre) => {
    logger.debug(`Sort by ${genre}`);
    dispatch({ type: "FILTER_BY_GENRE", payload: genre });
    dispatch({ type: "SET_CURRENT_SELECTED_IS_FILTER_BY", payload: genre });
  };

  const filterList = filters.map((filter, index) => {
    return (
      <li
        key={index}
        className="cursor-pointer group disabled"
        onClick={() => handleFilterClick(filter.name)}
        data-test-id={`sort-by-${filter.name}`}
      >
        <button className="flex text-lg p-1">
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
        data-test-id={`sort-by-${genre.name}`}
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
          <span
            className="self-center capitalize text-white"
            data-test-id={`${genre.name}`}
          >
            {genre.name == "rpg" ? genre.name.toUpperCase() : genre.name}
          </span>
        </button>
      </li>
    );
  });

  return (
    <Transition direction="right" duration={1} distance={100}>
      <div className="mx-4 md:mx-6 lg:mx-10 4xl:max-w-[1980px] 4xl:mx-auto">
        <Navbar dispatch={dispatch} />
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
                <b className="ml-2" data-test-id="filter-by">
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
                data-test-id="clear-filter"
              >
                Clear filter
              </button>
            </div>
            <div className="grid grid-cols-12 gap-6 p-4" data-test-id="cards">
              {searchQuery == ""
                ? games &&
                  games.map((game, index) => (
                    <Card
                      key={index}
                      id={game.id}
                      name={game.name}
                      image={game.background_image}
                      parent_platform={game.parent_platforms}
                      metacritic={game.metacritic}
                      released={game.released}
                      genres={game.genres}
                      handleHeartClick={handleHeartClick}
                      isLoading={isLoading}
                    />
                  ))
                : queriedGames &&
                  queriedGames.map((game, index) => (
                    <Card
                      key={index}
                      id={game.id}
                      name={game.name}
                      image={game.background_image}
                      parent_platform={game.parent_platforms}
                      metacritic={game.metacritic}
                      released={game.released}
                      genres={game.genres}
                      handleHeartClick={handleHeartClick}
                      isLoading={isLoading}
                    />
                  ))}
            </div>
          </div>
        </div>
      </div>
    </Transition>
  );
};

export default Games;
