import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../src/utils/firebase";
import logger from "../../src/utils/logger";

describe("filter", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/#/auth/login");
    cy.login(true);
    cy.wait(2000);
    cy.getBySel("browse").click();
  });

  afterEach(() => {
    cy.get('[data-test-id="clear-filter"]').click();
    cy.get('[data-test-id="filter-by"]').should("have.text", "none");
  });

  it("should sort by release date", () => {
    cy.getBySel("cards").children().should("have.length", 40);
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

  it("should sort by metacritic", () => {
    cy.getBySel("cards").children().should("have.length", 40);
    cy.get('[data-test-id="sort-by-metacritic"]').click();

    const cardMetacritics = [];
    cy.get('[data-test-id^="card-"]')
      .each((card) => {
        const metacritic = card[0].querySelector('[data-test-id="metacritic"]');
        cardMetacritics.push(metacritic);
      })
      .then(() => {
        const sortedCardMetacritics = cardMetacritics.sort().reverse();
        expect(sortedCardMetacritics).to.deep.equal(cardMetacritics);
      });
  });

  it("should sort by genre", () => {
    const cards = [];
    const genre = "action";
    let found = true;
    cy.get('[data-test-id="sort-by-action"]').click();
    cy.log(cy.get('[data-test-id="action"]').textContent);
    cy.get('[data-test-id^="card-"]')
      .each((card) => {
        const temp = card[0]
          .querySelector('[data-test-id="genre"]')
          .textContent.replace("Genres: ", "");
        cards.push(temp);
      })
      .then(() => {
        logger.debug("dez nuts");
        logger.debug(cards);
        cards.forEach((card) => {
          logger.debug(card);
          if (!card.toLowerCase().includes(genre)) {
            found = false;
          }
        });
        expect(found).to.be.true;
      });
  });

  it("should sort by wishlist", () => {
    const cards = [];
    let found = true;

    cy.get('[data-test-id="sort-by-wishlist"]').click();
    cy.get('button[data-test-id="wishlist"]')
      .closest('div[data-test-id^="card-"]')
      .each((card) => {
        logger.debug(card);
        let temp = card[0].querySelector(
          '[data-test-id="title-name"]'
        ).textContent;
        logger.debug(temp);
        cards.push(temp);
      })
      .then(async () => {
        const querySnapshot = query(
          collection(db, "wishlist"),
          where("user", "==", "WFPEIf4SlChZt4dAoAL4bvmKYFa2")
        );
        getDocs(querySnapshot).then((querySnapshot) => {
          querySnapshot.docs.forEach((doc) => {
            logger.debug(`${doc.id} => ${doc.data()}`);
            cards.forEach((card) => {
              if (card != doc.data().name) {
                found = false;
              }
            });
          });
          expect(found).to.be.true;
        });
      });
  });
});
