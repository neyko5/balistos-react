describe('Balistos home page', () => {
    it('should have title named Balistos', () => {
        cy.visit('/');
        cy.title().should('include', 'Balistos');
    });
});
