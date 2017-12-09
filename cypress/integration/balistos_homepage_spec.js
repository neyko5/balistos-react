describe("Balistos home page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  xit("should have title named Balistos", () => {
    cy.title().should("include", "Balistos");
  });

  xit("should redirect to home after clicking on balistos logo", () => {
    cy.visit("http://localhost:3000/test");
    cy.get("div#logo").click();
    cy.url().should("include", "http://localhost:3000/");
  });

  xit("should log in and log out user", () => {
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

  xit("should log out user", () => {
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

  xit("should search for playlist named Carski playlist", () => {
    cy.get('input[name="search-playlist"').type('Carski playlist');
    //cy.contains('')
  });
});
