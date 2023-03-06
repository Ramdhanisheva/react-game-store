describe("Log in", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/#/auth/login");
  });

  it("log in and remember user credentials", () => {
    cy.login(true);
    cy.url().should("eq", "http://localhost:5173/#/");
    cy.getAllLocalStorage().then((result) => {
      expect(result)
        .to.have.property("http://localhost:5173")
        .not.to.equal(null);
    });
    cy.getAllSessionStorage().then((result) => {
      expect(result).to.have.property("http://localhost:5173").not.to.be.null;
    });
  });

  it("log in and not remember user credentials", () => {
    cy.login(false);
    cy.url().should("eq", "http://localhost:5173/#/");
    cy.getAllSessionStorage().then((result) => {
      expect(result)
        .to.have.property("http://localhost:5173")
        .not.to.equal(null);
    });
    cy.getAllLocalStorage().then((result) => {
      expect(result).to.have.property("http://localhost:5173").not.to.be.null;
    });
  });
});
