import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../src/utils/firebase";
import logger from "../../src/utils/logger";

describe("wishlist", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/#/auth/login");
    cy.login(true);
    cy.wait(2000);
    cy.getBySel("browse").click();
    cy.wait(2000);
  });

  it("should add to wishlist", () => {
    let titleName;
    let found = false;
    cy.get(
      'div[data-test-id^="card-"] button:not(button[data-test-id="wishlist"])'
    ).then((cards) => {
      const card = cards[0];
      titleName = card
        .closest('div[data-test-id^="card-"]')
        .querySelector('[data-test-id="title-name"]').textContent;
      cy.log(titleName);
      card.click();
      cy.wait(4000).then(async () => {
        const querySnapshot = query(
          collection(db, "wishlist"),
          where("user", "==", "WFPEIf4SlChZt4dAoAL4bvmKYFa2")
        );
        getDocs(querySnapshot).then((querySnapshot) => {
          querySnapshot.docs.forEach((doc) => {
            if (doc.data().name == titleName) {
              found = true;
              logger.debug(found);
            }
          });
          expect(found).to.be.true;
        });
      });
    });
  });

  it("should remove from wishlist", () => {
    let titleName;
    let removed = true;
    cy.get('div[data-test-id^="card-"] button[data-test-id="wishlist"]')
      .first()
      .then((wishlistButton) => {
        logger.debug(wishlistButton);
        titleName = wishlistButton[0]
          .closest('div[data-test-id^="card-"]')
          .querySelector('[data-test-id="title-name"]').textContent;
        wishlistButton[0].click();
        cy.wait(4000).then(() => {
          const querySnapshot = query(
            collection(db, "wishlist"),
            where("user", "==", "WFPEIf4SlChZt4dAoAL4bvmKYFa2")
          );
          getDocs(querySnapshot).then((querySnapshot) => {
            querySnapshot.docs.forEach((doc) => {
              if (doc.data().name == titleName) {
                logger.debug(doc.data().name, titleName);
                removed = false;
              }
            });
          });
        });
      })
      .then(() => {
        expect(removed).to.be.true;
      });
  });
});
