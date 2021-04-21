it('navigate around the website', () => {
  cy.visit('http://localhost:3000');

  cy.get('[data-cy="appbar-menu-/"]').contains('Zakoupit známku').click();
  cy.location('pathname').should('match', /\//)
  cy.get('main');
  
  cy.get('[data-cy="appbar-menu-/prehled"]').contains('Moje známky').click();
  cy.location('pathname').should('match', /\/login$/)
  cy.get('main');

  cy.get('[data-cy="link-to-registration"]').contains('Zaregistrujte se.').click();
  cy.location('pathname').should('match', /\/registrace$/)
  cy.get('main').contains('Registrace');

});