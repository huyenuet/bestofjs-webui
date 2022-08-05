describe('Tests for BestOfJs/ Home page', () => {
  it('Check Home page', () => {
    cy.visit('https://bestofjs.org/');

    // Check Hot Projects table
    cy.findByRole('heading', { level: 2, name: /Hot Projects/ }).should('exist')
    // Table should have 5 rows
    cy.findByTestId('hot-projects-section').find('tbody>tr').should('have.length', 5)
    // Selected Time in the dropdown should be "Today"
    cy.findByTestId('hot-projects-button').should('have.text', 'Today')

    // Check The Recently Added Projects table
    cy.findByRole('heading', { level: 2, name: /Recently Added Projects/ }).should('exist')
    // Table should have 5 rows
    cy.findByTestId('newest-section').find('tbody>tr').should('have.length', 5)
    // Check Monthly Rankings table
    cy.findByRole('heading', { level: 2, name: /Monthly Rankings/ }).should('exist')
    // Table should have 5 rows
    cy.findByTestId('home-monthly-ranking-section').find('tbody>tr').should('have.length', 5)
    // Month and Year should be previous month
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    let currentMonthIndex: number = new Date().getMonth()
    let lastMonthIndex = currentMonthIndex - 1
    if (currentMonthIndex == 0) {
        lastMonthIndex = months.length - 1
    }
    let lastMonthName = months[lastMonthIndex]
    let current_year: number = new Date().getFullYear()
    cy.findByTestId('home-monthly-ranking-section').findByRole('heading', { level: 3 }).should('have.text', lastMonthName + " " + current_year.toString())

    // Check View Full Rankings button at the bottom of table "Hot Projects"
    cy.findByTestId('hot-projects-section').findByText(/View full rankings/i).click()
    cy.url().should('equal', 'https://bestofjs.org/projects?sort=daily')
    cy.findByRole('heading', { level: 1, name: /All Projects/ }).should('exist')

    // Check View More button at the bottom of table "Recently Added Projects"
    cy.go('back')
    cy.findByTestId('newest-section').findByText(/View more/i).click()
    cy.url().should('equal', 'https://bestofjs.org/projects?sort=newest')
    cy.findByRole('heading', { level: 1, name: /All Projects/ }).should('exist')

    // Check View Full Rankings button at the bottom of table "Monthly Rankings"
    cy.go('back')
    cy.findByTestId('home-monthly-ranking-section').findByText(/View full rankings/).click()
    cy.url().should('contains', 'https://bestofjs.org/rankings/monthly')
    cy.findByRole('heading', { level: 1, name: /Monthly Rankings/ }).should('exist')
  })
});
