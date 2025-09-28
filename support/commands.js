// cypress/support/commands.js
Cypress.Commands.add("saveScreenshotWithTS", (name) => {
  const now = new Date().toISOString().replace(/[:.]/g, "-");
  cy.screenshot(`${name}-${now}`);
});

Cypress.Commands.add("genEmails", (count = 10, prefix = "kirati") => {
  const base = `${prefix}_${Date.now()}`;
  const emails = Array.from({ length: count }, (_, i) => {
    return `${base}_${i + 1}@mail.com`;
  });
  return cy.wrap(emails);
});
