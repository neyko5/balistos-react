describe("Balistos home page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("should have title named Balistos", () => {
    cy.title().should("include", "Balistos");
  });

  it("should redirect to home after clicking on balistos logo", () => {
    cy.visit("http://localhost:3000/test");
    cy.get("div#logo").click();
    cy.url().should("include", "http://localhost:3000/");
  });

  it("should log in and log out user", () => {
    cy.get("button#log-in-button").click();
    cy
      .get('input[name="username"')
      .clear()
      .type("testuser123123");
    cy
      .get('input[name="password"')
      .clear()
      .type("testpassword123123");
    cy.get('button[type="submit"]').click();
    cy.get("div#username").contains("testuser123123");
  });

  it("should log out user", () => {
    cy.get("button#log-in-button").click();
    cy
      .get('input[name="username"')
      .clear()
      .type("testuser123123");
    cy
      .get('input[name="password"')
      .clear()
      .type("testpassword123123");
    cy.get('button[type="submit"]').click();
    cy.get("div#username").contains("testuser123123");

    cy.get("div#username").click();
    cy.get("button#log-out").click();
    cy.contains("Log in");
    cy.contains("Register");
  });

  it("should search for playlist named Carski playlist, display title and desc", () => {
    cy.get('input[name="query"]').type('Carski playlist');
    cy.get('input[name="query"]').should('have.value', 'Carski playlist')
    cy.get('.results').contains('Carski playlist');
    cy.get('.results').contains('za legendose');
  });

  xit("should have popular playlists", () => {

  });
});
