describe("UI Login Test", () => {
  const interceptedData = [];

  beforeEach(() => {
    cy.intercept("POST", "https://robot-lab.onrender.com/api/**", (req) => {
      req.continue((res) => {
        interceptedData.push({
          url: req.url,
          method: req.method,
          requestBody: req.body,
          responseBody: res.body,
          statusCode: res.statusCode,
        });
      });
    }).as("anyApiPost");

    cy.visit("https://robot-lab-five.vercel.app/");
    cy.get(".logo").should("have.text", "Lobot Framework Lab");
  });

  it("should login Success", () => {
    cy.get(".nav-btn-login").click();
    cy.get("#loginEmail").type("boss2@gmail.com");
    cy.get("#loginPassword").type("password1234");
    cy.get("form > button").click({ force: true });

    cy.wait("@anyApiPost");

    cy.get(".message").should("have.text", "Login successful! Welcome, Boss!");
    cy.screenshot("login-success");
  });

  it("should login Fail", () => {
    cy.get(".nav-btn-login").click();
    cy.get("#loginEmail").type("wrong@gmail.com");
    cy.get("#loginPassword").type("wrongpass");
    cy.get("form > button").click({ force: true });

    cy.wait("@anyApiPost");

    cy.get(".message").should("contain.text", "Invalid"); // ปรับข้อความตามจริง
    cy.screenshot("login-fail");
  });

  after(() => {
    cy.writeFile("cypress/fixtures/intercepted_post_data.json", interceptedData, {
      log: true,
    });
  });
});
