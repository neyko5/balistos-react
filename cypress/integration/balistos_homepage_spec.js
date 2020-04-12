describe('Balistos home page', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000');
    });

    it('should have title named Balistos', () => {
        cy.title().should('include', 'Balistos');
    });
});
