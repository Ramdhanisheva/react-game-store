import genres from "./genres";

const initialState = {
  games: null,
  initGames: null,
  wishlist: null,
  isLike: null,
  filterBy: null,
  isSelected: null,
};
const reducer = (state, action) => {
  switch (action.type) {
    case "SET_GAMELIST":
      return {
        ...initialState,
        games: action.payload,
        initGames: action.payload,
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
      return;
    case "CLEAR_FILTER":
      console.log(state.initGames);
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
