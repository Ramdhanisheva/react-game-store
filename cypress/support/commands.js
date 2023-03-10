// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("getBySel", (selector) => {
  return cy.get(`[data-test-id="${selector}"]`);
});

Cypress.Commands.add("login", (remembered) => {
  cy.get("input[name=email]").type("isenahemmanuel@gmail.com");
  cy.get("input[name=password]").type("makepassword");
  if (!remembered) {
    cy.get("input[name=remember").click();
    cy.get("button[type=submit]").click();
  } else {
    cy.get("button[type=submit]").click();
  }
});
