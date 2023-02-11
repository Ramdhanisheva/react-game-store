import React from "react";
import { useState, useEffect, useRef } from "react";
import { fetchGames } from "../utils/fetchGames";
import { scrollToNext, scrollToPrev } from "../utils/scrollToIndex";
import { Link } from "react-router-dom";

const Carousel = () => {
  const [gameList, setGameList] = useState(null);
  const [sixGames, setSixGames] = useState([]);
  const [progressBar, setProgressBar] = useState(0)
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const listRef = useRef(null);
  const intervalRef = useRef(null)


  useEffect(() => {
    let ignore = false;

    function randomIndex(arr, chosen = []) {
      if (arr.results.length === 0) return;
      const random = Math.floor(Math.random() * arr.results.length);
      if (chosen.includes(random)) {
        return randomIndex(arr, chosen);
      }
      chosen.push(random);
      return random;
    }

    const randomGame = (gameList) => {
      let chosen = [];

      if (gameList != null) {
        for (let i = 0; i < 6; i++) {
          const randIndex = randomIndex(gameList, chosen);

          setSixGames((prevState) => {
            return prevState != null ? [...prevState, gameList.results[randIndex]] : gameList.results[randIndex];
          });
        }
        setLoading(false);
      } 
    };

    async function sendRequest() {
      try {
        const games = await fetchGames("https://api.rawg.io/api/games?page_size=40&key=da8b78f38c134484a249b5f177270923")

        if(!ignore) {
          setGameList(games)
          randomGame(games); 
        }
      } catch(err) {
        console.log(err)
      }
    }
    sendRequest()
    
    // (async () => { 
    //   let timeoutId
    //   let games
    //   const sendRequest = async () => {
    //     try {
    //       games = await fetchGames("https://api.rawg.io/api/games?page_size=40&key=da8b78f38c134484a249b5f177270923")
    //     } catch(err) {
    //       throw new Error(err)
    //     }
    //   }

    //   const debouncedRequest = () => {
    //     clearTimeout(timeoutId)

    //     timeoutId = setTimeout(() => {
    //       sendRequest()
    //     }, 10000)
    //   }
    //   debouncedRequest()

    //   if (!ignore) { 
    //     console.log(games); 
    //     setGameList(games); 
    //     randomGame(games); 
    //   } 
    // })(); 

    return () => { ignore = true; }; 

 }, []); 

  useEffect(() => {
    if (!loading) {
      intervalRef.current = setInterval(() => {
        progressBar >= 100 && setCurrentSlideIndex(prevIndex => prevIndex == 5 ? 0 : prevIndex + 1)
        setProgressBar(prevProgressBar => {
          if (prevProgressBar >= 100) {
            console.log(currentSlideIndex)
            scrollToNext(currentSlideIndex, 6, listRef)
            return 0
          }
          return prevProgressBar + 0.2
        })
      }, 10);
    }

    return () => clearInterval(intervalRef.current)
  })

  const images = sixGames.map((game, index) => {
    return (
      <div
        id={`slide` + index}
        className="carousel-item relative w-full"
        key={index}
      >
        <img src={game.background_image} className="max-w-full h-auto rounded-xl aspect-[16/9]" />
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <button
            className="btn btn-circle"
            onClick={() => {
              scrollToPrev(index, 6, listRef);
              setCurrentSlideIndex(prevIndex => prevIndex == 0 ? 5 : prevIndex - 1)
              setProgressBar(0)
            }}
          >
            ❮
          </button>
          <button
            className="btn btn-circle"
            onClick={() => {
              scrollToNext(index, 6, listRef);
              setCurrentSlideIndex(prevIndex => prevIndex == 5 ? 0 : prevIndex + 1)
              setProgressBar(0)
            }}
            data-testid={`nextBtn${index}`}
          >
            ❯
          </button>
        </div>
      </div>
    );
  });

  const sideCards = sixGames.map((game, index) => {
    return (
      <div className="grid grid-cols-10 rounded-xl p-4 hover:bg-zinc-800 h-full justify-center align-middle gap-3 cursor-pointer" key={index}>
        <div className="col-span-3 h-min self-center">
          <img src={game.background_image} alt="game" className="max-w-full h-auto rounded-lg" />
        </div>
        <div className="col-span-7 font-md truncate h-min self-center">
          <span className="text-sm">{game.name}</span>
        </div>
      </div>
    )
  })
  // console.log(sixGames);
  // console.log(gameList);
  return (
    <div className="grid grid-cols-5 gap-8">
      <div className="col-span-4">
        <div>
        {!loading && <><div className="carousel w-full rounded-2xl aspect-[16/9] overflow-hidden" ref={listRef}>
          {images}
        </div>
        <progress className="progress progress-primary w-full transition-all ease-in-out duration-200 " value={progressBar} max="100"></progress></>}
        </div>
      </div>
      <div className="col-span-1 rounded-2x">
        <ul className="flex flex-col justify-between h-full gap-2">
        {!loading && sideCards}
        </ul>
      </div>
    </div>
  );
};

export default Carousel;
