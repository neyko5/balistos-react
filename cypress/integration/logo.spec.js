describe('Balistos home page', () => {
    it('should redirect to home after clicking on balistos logo', () => {
        cy.visit('/');
        cy.get('#logo').click();
        cy.url().should('eq', Cypress.config().baseUrl + '/');
    });
});
