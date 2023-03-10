import logger from "../../utils/logger";

const initialState = {
  games: null,
  initGames: null,
  queriedGames: null,
  filterBy: null,
  isSelected: null,
  isLoading: true,
  isInitialRender: true,
  searchQuery: "",
};
const reducer = (state, action) => {
  switch (action.type) {
    case "SET_GAMELIST":
      return {
        ...initialState,
        games: action.payload.games,
        initGames: action.payload.games,
        isLoading: false,
      };
    case "SET_CURRENT_SELECTED_IS_FILTER_BY":
      return {
        ...state,
        isSelected: action.payload,
      };
    case "FILTER_BY_GENRE":
      const filteredGames = state.initGames.filter((game) => {
        let found = false;
        game.genres.forEach((el) => {
          if (el.name.toLowerCase() == action.payload) {
            found = true;
          }
        });
        if (found) {
          return true;
        } else {
          return false;
        }
      });
      return {
        ...state,
        games: filteredGames,
        filterBy: action.payload,
      };
    case "SORT_BY_RELEASE_DATE":
      const sortedByReleaseDate = [...state.initGames]
        .sort((a, b) => {
          const dateA = Date.parse(new Date(a.released));
          const dateB = Date.parse(new Date(b.released));
          return dateA - dateB;
        })
        .reverse();
      return {
        ...state,
        games: sortedByReleaseDate,
        filterBy: action.payload,
      };
    case "SORT_BY_METACRITIC":
      const sortedByMetacritic = [...state.initGames]
        .sort((a, b) => {
          return a[action.payload] - b[action.payload];
        })
        .reverse();
      return {
        ...state,
        games: sortedByMetacritic,
        filterBy: action.payload,
      };
    case "SORT_BY_WISHLIST":
      const sortedByWishlist = state.initGames.filter((game) => {
        let found = false;
        action.payload.wishlist.forEach((heartedGame) => {
          if (heartedGame.data().name == game.name) {
            found = true;
          }
        });
        if (found) {
          return true;
        }
      });

      return {
        ...state,
        games: sortedByWishlist,
        filterBy: action.payload.filter,
      };
    case "UPDATE_IS_LOADING":
      return {
        ...state,
        isLoading: action.payload,
      };
    case "UPDATE_IS_INITIAL_RENDER":
      return {
        ...state,
        isInitialRender: action.payload,
      };
    case "UPDATE_SEARCH_QUERY":
      return {
        ...state,
        searchQuery: action.payload,
      };
    case "FILTER_BY_SEARCH_QUERY":
      const filterByQuery = state.games.filter((game) =>
        game.name.toLowerCase().includes(action.payload.toLowerCase())
      );
      return {
        ...state,
        queriedGames: filterByQuery,
      };
    case "CLEAR_FILTER":
      logger.debug(state.initGames);
      return {
        ...state,
        games: state.initGames,
        filterBy: null,
        isSelected: null,
      };
    default:
      throw new Error(`No such payload as ${action.type}`);
  }
};

export { reducer, initialState };
