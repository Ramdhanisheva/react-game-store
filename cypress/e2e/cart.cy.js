import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../src/utils/firebase";
import logger from "../../src/utils/logger";

describe("cart", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/#/auth/login");
    cy.login(true);
    cy.wait(2000);
    cy.getBySel("browse").click();
    cy.wait(2000);
  });

  it("should add game to cart", () => {
    let titleName;
    let found = false;
    cy.get(
      'div[data-test-id^="card-"] button:not(button[data-test-id="cart"])'
    ).then((cards) => {
      const card = cards[0];
      titleName = card
        .closest('div[data-test-id^="card-"]')
        .querySelector('[data-test-id="title-name"]').textContent;
      cy.log(titleName);
      card.click();
      cy.wait(4000).then(async () => {
        const querySnapshot = query(
          collection(db, "orders"),
          where("user", "==", "WFPEIf4SlChZt4dAoAL4bvmKYFa2")
        );
        getDocs(querySnapshot).then((querySnapshot) => {
          querySnapshot.docs[0].data().games.forEach((game) => {
            if (game.name == titleName) {
              found = true;
              logger.debug(found);
            }
          });
          expect(found).to.be.true;
        });
      });
    });
  });

  it("should remove game from cart", () => {
    let titleName;
    let removed = true;
    cy.get('label[data-test-id="drawer"]').click();
    cy.get('li[data-test-id^="cartItem-#"]').then((game) => {
      titleName = game[0].querySelector("span:first-child").textContent;
      cy.get(game).first().find("button").click();

      cy.wait(4000).then(async () => {
        const querySnapshot = query(
          collection(db, "orders"),
          where("user", "==", "WFPEIf4SlChZt4dAoAL4bvmKYFa2")
        );
        getDocs(querySnapshot).then((querySnapshot) => {
          querySnapshot.docs[0].data().games.forEach((game) => {
            if (game.name == titleName) {
              removed = false;
            }
          });
          expect(removed).to.be.true;
        });
      });
    });
  });

  it.only("should complte checkout", () => {
    let titleName;
    let completed = false;
    cy.get('label[data-test-id="drawer"]').click();
    cy.get('[data-test-id="checkout"]').click();

    cy.wait(4000).then(async () => {
      const querySnapshot = query(
        collection(db, "orders"),
        where("user", "==", "WFPEIf4SlChZt4dAoAL4bvmKYFa2")
      );
      getDocs(querySnapshot).then((querySnapshot) => {
        if (querySnapshot.docs[0].data().isCompleted) {
          completed = true;
        }
        expect(completed).to.be.true;
      });
      cy.url().should("eq", "http://localhost:5173/#/");
    });
  });
});
