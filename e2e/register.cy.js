// cypress/e2e/register.cy.js
/// <reference types="cypress" />
describe("UI Register - capture API request & response", () => {
  const intercepted = [];

  beforeEach(() => {
    // Intercept registration POSTs and store data
    cy.intercept("POST", "**/api/auth/register", (req) => {
      req.continue((res) => {
        intercepted.push({
          url: req.url,
          method: req.method,
          requestBody: req.body,
          responseBody: res.body,
          statusCode: res.statusCode,
        });
      });
    }).as("registerApi");

    cy.visit("https://robot-lab-five.vercel.app/");
    cy.get(".logo").should("exist");
  });

  it("should register Success (UI) and capture API", () => {
    cy.get(".nav-btn-register").click();
    cy.get("#firstName").type("Auto");
    cy.get("#lastName").type("Tester");
    cy.get("#email").type(`capture_${Date.now()}@mail.com`);
    cy.get("#password").type("123456");
    cy.get('form button[type="submit"]').click();

    cy.wait("@registerApi");
    cy.get(".message.success").should("contain.text", "Registration successful");
    cy.saveScreenshotWithTS("register-success");
  });

  it("should register Fail (UI) and capture API", () => {
    cy.get(".nav-btn-register").click();
    cy.get("#firstName").type("Fail");
    cy.get("#lastName").type("Case");
    cy.get("#email").type("boss2@gmail.com"); // ตัวอย่าง email ที่มีอยู่แล้ว
    cy.get("#password").type("123456");
    cy.get('form button[type="submit"]').click();

    cy.wait("@registerApi");
    cy.get(".message.error").should("contain.text", "already exists");
    cy.saveScreenshotWithTS("register-fail");
  });

  after(() => {
    // บันทึก intercepted request/response เป็น fixture เพื่อใช้ replay ต่อ
    if (intercepted.length) {
      cy.writeFile("cypress/fixtures/intercepted_register.json", intercepted, {
        log: true,
      });
      cy.log("Wrote cypress/fixtures/intercepted_register.json");
    }
  });
});
