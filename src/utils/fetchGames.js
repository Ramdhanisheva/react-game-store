import logger from "./logger";

const sendRequest = async (url) => {
  const res = await window.fetch(url);
  return res.json();
};

const storeGames = async (url) => {
  let data = JSON.parse(localStorage.getItem("cachedRequest") || "{}");
  if (Object.keys(data).length === 0) {
    data = await sendRequest(url);
    localStorage.setItem("cachedRequest", JSON.stringify(data));
    logger.debug("FETCHED DATA");
    return data;
  }
  return data;
};

const fetchGames = (url) => {
  return storeGames(url);
};

export { sendRequest, storeGames, fetchGames };
