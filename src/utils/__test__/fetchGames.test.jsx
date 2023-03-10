import "@testing-library/jest-dom";
import { sendRequest, storeGames } from "../fetchGames";
import logger from "../logger";

const url = "https://www.example.com/games";
const expectedData = {
  results: [
    {
      name: "CyberPunk 2077",
    },
    {
      name: "Genshin Impact",
    },
  ],
};
const mockFetch = jest.fn().mockResolvedValue({
  json: () => Promise.resolve(expectedData),
});

beforeEach(() => {
  jest.clearAllMocks();
});

describe("test sendRequest", () => {
  it("sendRequest is called once", async () => {
    window.fetch = mockFetch;

    await sendRequest(url);

    expect(mockFetch).toHaveBeenCalledTimes(1);
  });

  it("should return an object of gamess with 1st arr as CyberPunk 2077", async () => {
    window.fetch = mockFetch;

    const games = await sendRequest(url);
    logger.debug(games);

    expect(games.results[0].name).toMatch(/Cyber/);
  });
});

describe("test storeGames", () => {
  it("should return the correct data from localStorage when present", async () => {
    localStorage.setItem("cachedRequest", JSON.stringify(expectedData));

    window.fetch = jest.fn();

    const games = await storeGames(url);

    expect(games).toMatchObject(expectedData);
  });

  it("should call sendRequest and store the response in localStorage when not present", async () => {
    window.fetch = mockFetch;

    await storeGames(url);

    expect(JSON.parse(localStorage.getItem("cachedRequest"))).toMatchObject(
      expectedData
    );
  });
});
