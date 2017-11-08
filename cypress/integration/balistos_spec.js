describe('Balistos front page', () => {
  it('Front page should have correct title', () => {
    // https://on.cypress.io/visit
    cy.visit('http://localhost:3000');

    // Here we've made our first assertion using a '.should()' command.
    // An assertion is comprised of a chainer, subject, and optional value.

    // https://on.cypress.io/should
    // https://on.cypress.io/and

    // https://on.cypress.io/title
    cy.title().should('include', 'Balistos');

    cy.contains('Register').click();
    cy.get('input[name="username"').clear().type('testuser123123');
    cy.get('input[name="password"').clear().type('testpassword123123');
    cy.get('button[type="submit"]').click();
  });
});
