// cypress/e2e/api_replay.cy.js
/// <reference types="cypress" />
describe("API Replay - replay captured register requests (10 rounds) - Kirati", () => {
  it("replay register API 10 times using different kirati emails", () => {
    cy.log("Waiting 31 seconds for backend warm-up (per requirement)...");
    cy.wait(31000);

    cy.fixture("intercepted_register.json").then((arr) => {
      if (!arr || !arr.length) {
        throw new Error("No intercepted register fixture found. Run register capture test first.");
      }

      const template = arr[0];
      const url = template.url;
      const method = template.method || "POST";
      const baseBody = template.requestBody || {};

      const emails = Array.from({ length: 10 }, (_, i) => `kirati_replay_${Date.now()}_${i + 1}@mail.com`);

      emails.forEach((email, idx) => {
        const payload = { ...baseBody, email };

        cy.request({
          method,
          url,
          body: payload,
          failOnStatusCode: false,
        }).then((res) => {
          const out = {
            round: idx + 1,
            timestamp: new Date().toISOString(),
            email,
            status: res.status,
            body: res.body,
          };
          cy.writeFile(`cypress/results/api-replay-kirati-round-${idx + 1}.json`, out);
          cy.saveScreenshotWithTS(`api-replay-kirati-round-${idx + 1}`);
        });
      });
    });
  });
});
