import React from "react";
import { useEffect, useRef } from "react";
import { fetchGames } from "../../utils/fetchGames";
import useCarousel from "./useCarousel";
import { scrollToExact } from "../../utils/scrollToIndex";

const Carousel = () => {
  const [state, dispatch] = useCarousel();
  const { games ,slideGames, slideIndex, slideName, progressBar, loading, error } = state
  const carouselRef = useRef(null);
  const intervalRef = useRef(null);

  console.log(slideGames)

  useEffect(() => {
    let ignore = false;

    const sendRequest = async () => {
      try {
        const games = await fetchGames(
          "https://api.rawg.io/api/games?page_size=40&key=da8b78f38c134484a249b5f177270923"
        );
        !ignore && dispatch({ type: "SET_GAMES", payload: games });
      } catch (err) {
        console.log(err);
        dispatch({ type: "SET_ERROR", payload: true });
      }
    };
    sendRequest();

    return () => ignore = true
  }, []);

  useEffect(() => {
    if (!loading && !error && carouselRef) {
      console.log("Component loaded")
      dispatch({type: "INIT_SCROLL_SLIDE", payload: [0, slideGames.length, carouselRef, "to"]})
    }
  }, [carouselRef.current, loading])

  // useEffect(() => {
  //   if (true) {
  //     intervalRef.current = setInterval(() => {
  //       // console.log(progressBar)
  //       if (progressBar >= 100) {
  //         dispatch({type: "SCROLL_SLIDE", payload: [slideIndex, slideGames.length, carouselRef, "forward"]})
  //       } else {
  //         dispatch({type: "SET_PROGRESS_BAR", payload: 0.2})
  //       }
  //     }, 5)
  //   }
  //   return () => {
  //     clearInterval(intervalRef.current)
  //   }
  // })
  
  
  
  const images = !loading && !error && slideGames.map((game, index) => {
    return (
      <div
        id={`slide` + index}
        className="carousel-item relative w-full"
        key={index}
      >
        <img
          src={game.background_image}
          className="max-w-full h-auto rounded-xl aspect-[16/9]"
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
      </div>
    );
  });

  const sideCards = !loading && !error && slideGames.map((game, index) => {
    return (
      <div
        className="grid grid-cols-10 rounded-xl p-4 hover:bg-zinc-800 h-full justify-center align-middle gap-3 cursor-pointer"
        id={`card${index}`}
        key={index}
      >
        <div className="col-span-3 h-min self-center">
          <img
            src={game.background_image}
            alt="game"
            className="max-w-full h-auto rounded-lg"
          />
        </div>
        <div className="col-span-7 font-md truncate h-min self-center">
          <span className="text-sm">{game.name}</span>
        </div>
      </div>
    );
  });

  return (
    <div className="grid grid-cols-5 gap-8">
      <div className="md:col-span-4 col-span-5">
        <div className="relative">
          {!loading && !error && (
            <>
              <div
                className="carousel w-full rounded-2xl aspect-[16/9] overflow-hidden"
                ref={carouselRef}
              >
                {images}
              </div>
              <span className="text-4xl font-bold text-white absolute p-12 self-end bottom-10">{slideName}</span>

              <progress
                className="progress progress-primary w-full transition-all ease-in-out duration-200"
                value={progressBar}
                max="100"
              ></progress>
            </>
          )}
        </div>
      </div>
      <div className="md:col-span-1 col-span-5 rounded-2x">
        <ul className="flex flex-col justify-between h-full gap-2">
          {!loading && !error && sideCards}
        </ul>
      </div>
    </div>
  );
};

export default Carousel;
