describe("logout", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/#/auth/login");
  });

  it("should log out", () => {
    cy.login(false);
    cy.getBySel("logout").click();
    cy.url().should("eq", "http://localhost:5173/#/auth/login");
    cy.getAllLocalStorage().then((result) => {
      expect(result)
        .to.have.property("http://localhost:5173")
        .to.have.property("user")
        .to.be.oneOf(["null", null]);
    });
    cy.getAllSessionStorage().then((result) => {
      expect(result)
        .to.have.property("http://localhost:5173")
        .to.have.property("user")
        .to.be.oneOf(["null", null]);
    });
  });
});
