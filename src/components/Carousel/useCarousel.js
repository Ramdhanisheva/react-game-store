import { useReducer } from "react";
import randomGames from "../../utils/randomGames";
import {
  scrollToNext,
  scrollToPrev,
  scrollToExact,
} from "../../utils/scrollToIndex";

const initialState = {
  games: null,
  slideGames: null,
  slideIndex: null,
  slideName: "",
  loading: true,
  error: false,
};
const reducer = (state, action) => {
  switch (action.type) {
    case "SET_GAMES":
      return {
        ...state,
        games: action.payload,
        slideGames: randomGames(action.payload, 6),
        loading: false,
      };
    case "INIT_SCROLL_SLIDE":
      const [initIndex, initQuantity, initRef] = action.payload;
      scrollToExact(initIndex, initQuantity, initRef);
      return {
        ...state,
        slideIndex: 0,
        slideName: state.slideGames[0].name,
      };
    case "SCROLL_SLIDE":
      const [index, quantity, ref, direction] = action.payload;
      let newIndex = null;
      if (direction == "forward") {
        newIndex = index === 5 ? 0 : index + 1;
        scrollToNext(index, quantity, ref);
      } else if (direction == "previous") {
        newIndex = index === 0 ? 5 : index - 1;
        scrollToPrev(index, quantity, ref);
      }
      return {
        ...state,
        slideIndex: newIndex,
        slideName: state.slideGames[newIndex].name,
      };
    case "SET_ERROR":
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      throw new Error(`Invalid action ${action.type}`);
  }
};

const useCarousel = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return [state, dispatch];
};

export default useCarousel;
