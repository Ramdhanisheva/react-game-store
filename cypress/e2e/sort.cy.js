describe("filter", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/#/auth/login");
    cy.login(true);
    cy.wait(2000);
    cy.getBySel("browse").click();
    cy.wait(3000);
  });

  it('should sort by release date', () => {
    cy.getBySel("cards").children().should("have.length", 40);;
    cy.get('[data-test-id="sort-by-release date"]').click();

    const dates = [];
    cy.get('[data-test-id^="card-"]')
      .each((card) => {
        const date = card[0]
          .querySelector('[data-test-id="released"]')
          .textContent.replace("Released: ", "");
        dates.push(date);
      })
      .then(() => {
        const sortedReleaseDates = dates.sort().reverse();
        expect(sortedReleaseDates).to.deep.equal(dates);
      });
  });

  it.only("should sort by metacritic", () => {
    cy.getBySel("cards").children().should("have.length", 40);;
    cy.get('[data-test-id="sort-by-metacritic"]').click();

    const cardMetacritics = [];
    cy.get('[data-test-id^="card-"]')
      .each((card) => {
        const metacritic = card[0]
          .querySelector('[data-test-id="metacritic"]')
        cardMetacritics.push(metacritic);
      })
      .then(() => {
        const sortedCardMetacritics = cardMetacritics.sort().reverse();
        expect(sortedCardMetacritics).to.deep.equal(cardMetacritics);
      });
  })
});

