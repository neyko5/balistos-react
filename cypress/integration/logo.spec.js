describe('Balistos home page', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000');
    });

    it('should redirect to home after clicking on balistos logo', () => {
        cy.visit('http://localhost:3000/test');
        cy.get('#logo').click();
        cy.url().should('include', 'http://localhost:3000/');
    });
});
