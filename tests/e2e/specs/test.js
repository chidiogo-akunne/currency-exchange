// https://docs.cypress.io/api/introduction/api.html

describe('E2E Tests', () => {
  it('Visits the app root url', () => {
    cy.visit('/');
    cy.contains('button', 'Submit');
  });

  it('Converts on submission', () => {
    cy.get('input[aria-label=Amount]').type('100');
    cy.contains('button', 'Submit').click();
    cy.get('input[readonly]').should('have.value', '0.93');
  });
});
