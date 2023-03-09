import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../src/utils/firebase";

describe("wishlist", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/#/auth/login");
    cy.login(true);
    cy.wait(2000);
    cy.getBySel("browse").click();
    cy.wait(3000);
  })

  it("should add to wishlist", () => {
    let titleName
    let found = false
    cy.get('div[data-test-id^="card-"] button:not(button[data-test-id="wishlist"])')
      .then((cards) => {
        const card = cards[0];
        titleName = card.closest('div[data-test-id^="card-"]').querySelector('[data-test-id="title-name"]').textContent
        cy.log(titleName)
        card.click();
        cy.wait(4000)

        .then(async () => {
          const querySnapshot = query(
            collection(db, "wishlist"),
            where("user", "==", "WFPEIf4SlChZt4dAoAL4bvmKYFa2")
          );
          getDocs(querySnapshot).then((querySnapshot) => {
            querySnapshot.docs.forEach(doc => {
              if (doc.data().name == titleName) {
                found = true
              }
            });
            expect(found).to.be.true;
          });
        });

      })

  })
})