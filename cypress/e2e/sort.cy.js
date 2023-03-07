describe("filter", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/#/auth/login");
    cy.login(true);
  });

  it('should sort by release date', () => {
    cy.wait(2000);
    cy.getBySel("browse").click();
    cy.wait(3000);
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
});

