describe('Tests for BestOfJs', () => {
  it('Check internal pages are loaded, external links are correct', () => {
    // Check Home page is present
    cy.visit('https://bestofjs.org/');
    cy.findByRole('heading', { level: 1, name: /The best of JavaScript, HTML and CSS/ }).should('exist')

    // Check Projects page is present
    cy.findByTestId('menu-projects').click();
    cy.url().should('equal', 'https://bestofjs.org/projects');
    cy.findByRole('heading', { level: 1, name: /All Projects/ }).should('exist')

    // Check Tags page is present
    cy.findByTestId('menu-tags').click();
    cy.url().should('equal', 'https://bestofjs.org/tags');
    cy.findByRole('heading', { level: 1, name: /All Tags/ }).should('exist')

    // Check Montly Rankings page is present
    cy.findByRole('button', { name: 'More' }).click();
    cy.findByTestId('menu-monthly').click();
    cy.url().should('equal', 'https://bestofjs.org/rankings/monthly');
    cy.findByRole('heading', { level: 1, name: /Monthly Rankings/ }).should('exist')

    // Check Hall of Fame page is present
    cy.findByRole('button', { name: 'More' }).click();
    cy.findByTestId('menu-hof').click();
    cy.url().should('equal', 'https://bestofjs.org/hall-of-fame');
    cy.findByRole('heading', { level: 1, name: /JavaScript Hall of Fame/ }).should('exist')

    // Check Timeline page is present
    cy.findByRole('button', { name: 'More' }).click();
    cy.findByTestId('menu-timeline').click();
    cy.url().should('equal', 'https://bestofjs.org/timeline');
    cy.findByRole('heading', { level: 1, name: /Timeline/ }).should('exist')

    // Check About page is present
    cy.findByRole('button', { name: 'More' }).click();
    cy.findByTestId('menu-about').click();
    cy.url().should('equal', 'https://bestofjs.org/about');
    cy.findByRole('heading', { level: 1, name: /About/ }).should('exist')

    // Check external link https://risingstars.js.org
    cy.findByRole('link', { name: 'Rising Stars' }).should(
      'have.attr',
      'href',
      'https://risingstars.js.org',
    )

    // Check external link https://stateofjs.com
    cy.findByRole('link', { name: 'State of JS' }).should(
      'have.attr',
      'href',
      'https://stateofjs.com',
    );
  });
});
