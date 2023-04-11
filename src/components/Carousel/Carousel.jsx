import { motion } from "framer-motion";
import React, { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchGames } from "../../utils/fetchGames";
import useCarousel from "./useCarousel";
import logger from "../../utils/logger";

const Carousel = () => {
  const [state, dispatch] = useCarousel();
  const navigate = useNavigate();
  const { slideGames, slideIndex, slideName, loading, error } = state;
  const carouselRef = useRef(null);
  const intervalRef = useRef(null);

  logger.debug(slideGames);

  useEffect(() => {
    let ignore = false;

    const sendRequest = async () => {
      try {
        const games = await fetchGames(
          "https://api.rawg.io/api/games?page_size=40&key=da8b78f38c134484a249b5f177270923"
        );
        !ignore && dispatch({ type: "SET_GAMES", payload: games });
      } catch (err) {
        logger.debug(err);
        dispatch({ type: "SET_ERROR", payload: true });
      }
    };
    sendRequest();

    return () => (ignore = true);
  }, []);

  useEffect(() => {
    if (!loading && !error && carouselRef) {
      logger.debug("Component loaded");
      dispatch({
        type: "INIT_SCROLL_SLIDE",
        payload: [0, slideGames.length, carouselRef, "to"],
      });
    }
  }, [carouselRef.current, loading]);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      dispatch({
        type: "SCROLL_SLIDE",
        payload: [slideIndex, slideGames.length, carouselRef, "forward"],
      });
    }, 8000);

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [slideIndex]);

  const images =
    !loading &&
    !error &&
    slideGames.map((game, index) => {
      return (
        <div
          id={`slide` + index}
          className="carousel-item relative w-full cursor-pointer"
          key={`slide` + game.id}
        >
          <img
            src={game.background_image}
            className="max-w-full h-auto rounded-xl aspect-[16/9]"
            onClick={() => navigate(`games/${game.id}`)}
          />
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <button
              className="btn btn-circle text-xl"
              onClick={() =>
                dispatch({
                  type: "SCROLL_SLIDE",
                  payload: [index, slideGames.length, carouselRef, "previous"],
                })
              }
            >
              ❮
            </button>
            <button
              className="btn btn-circle text-xl"
              onClick={() =>
                dispatch({
                  type: "SCROLL_SLIDE",
                  payload: [index, slideGames.length, carouselRef, "forward"],
                })
              }
              data-testid={`nextBtn${index}`}
            >
              ❯
            </button>
          </div>
          {game.name == slideName && (
            <motion.div
              className="h-[6px] bg-primary z-10 self-end absolute rounded-xl"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 8 }}
            />
          )}
        </div>
      );
    });

  const sideCards =
    !loading &&
    !error &&
    slideGames.map((game, index) => {
      return (
        <Link to={`/games/${game.id}`} key={index}>
          <div
            className="grid grid-cols-10 rounded-xl px-4 py-8 bg-zinc-800/50 hover:bg-neutral-700/50 transition-colors duration-200 h-full justify-center align-middle gap-3 cursor-pointer"
            id={`card${index}`}
          >
            <div className="col-span-3 h-min self-center">
              <img
                src={game.background_image}
                alt="game"
                className="max-w-full h-auto rounded-lg"
              />
            </div>
            <div className="col-span-7 font-medium   font-md truncate h-min self-center">
              <span className="text-base">{game.name}</span>
            </div>
          </div>
        </Link>
      );
    });

  return (
    <div className="grid grid-cols-5 gap-8">
      <div className="lg:col-span-4 col-span-5">
        <div className="relative">
          {!loading && !error && (
            <>
              <div
                className="carousel w-full rounded-2xl aspect-[16/9] overflow-hidden"
                ref={carouselRef}
              >
                {images}
              </div>
              <span className="text-xl md:text-2xl lg:text-4xl font-bold text-white absolute p-8 md:p-10 lg:p-14 self-end bottom-0">
                {slideName}
              </span>
            </>
          )}
        </div>
      </div>
      <div className="lg:col-span-1 col-span-5 rounded-2xl">
        <ul className="flex flex-col justify-between h-full gap-2 mb-4 md:mb-0">
          {!loading && !error && sideCards}
        </ul>
      </div>
    </div>
  );
};

export default Carousel;
