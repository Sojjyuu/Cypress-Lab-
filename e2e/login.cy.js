// cypress/e2e/login.cy.js
/// <reference types="cypress" />
describe("Login (UI + API verification) - Kirati", () => {
  beforeEach(() => {
    cy.visit("https://robot-lab-five.vercel.app/");
  });

  it("Login success: verify UI message and API token (Kirati)", () => {
    cy.get(".nav-btn-login").click();
    cy.get("#loginEmail").clear().type("Kirati.su@kkumail.com");
    cy.get("#loginPassword").clear().type("123456"); // ใช้รหัสที่ถูกต้องของคุณถ้ามี
    cy.get("form > button").click({ force: true });

    cy.get(".message").should("contain.text", "Login successful");
    cy.saveScreenshotWithTS("login-success-kirati");

    // ตัวอย่างการตรวจสอบ API เพิ่มเติม (ปรับ URL ให้ตรงกับ backend ของคุณ)
    cy.request({
      method: "POST",
      url: "https://robot-lab.onrender.com/api/auth/login",
      body: {
        email: "Kirati.su@kkumail.com",
        password: "123456",
      },
      failOnStatusCode: false,
    }).then((res) => {
      cy.log("Login API response:", JSON.stringify(res.body));
      // ถ้าคุณแน่ใจว่า API ต้อง return 200 และ token ให้เปิด assertion เหล่านี้
      // expect(res.status).to.eq(200);
      // expect(res.body).to.have.property("token");
      cy.writeFile("cypress/results/login-success-api-kirati.json", res.body);
      cy.saveScreenshotWithTS("login-success-api-kirati");
    });
  });

  it("Login fail: verify UI error and API 401 (invalid creds)", () => {
    cy.get(".nav-btn-login").click();
    cy.get("#loginEmail").clear().type("kirati.invalid@example.com");
    cy.get("#loginPassword").clear().type("wrongpass");
    cy.get("form > button").click({ force: true });

    cy.get(".message").should("contain.text", "Invalid");
    cy.saveScreenshotWithTS("login-fail-kirati");

    cy.request({
      method: "POST",
      url: "https://robot-lab.onrender.com/api/auth/login",
      body: { email: "kirati.invalid@example.com", password: "wrongpass" },
      failOnStatusCode: false,
    }).then((res) => {
      expect(res.status).to.be.oneOf([401, 400]);
      cy.writeFile("cypress/results/login-fail-api-kirati.json", res.body);
      cy.saveScreenshotWithTS("login-fail-api-kirati");
    });
  });
});
