function randomIndex(arr, chosen = []) {
  if (arr.results.length === 0) return;
  const random = Math.floor(Math.random() * arr.results.length);
  if (chosen.includes(random)) {
    return randomIndex(arr, chosen);
  }
  chosen.push(random);
  return random;
}

const randomGames = (games, quantity) => {
  let chosen = [];
  let arr = [];

  if (games) {
    for (let i = 0; i < quantity; i++) {
      const index = randomIndex(games, chosen);
      arr.push(games.results[index]);
    }
    return arr;
  }
};

export default randomGames;
