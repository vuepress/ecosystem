it('has navbar', () => {
  cy.visit('/')

  cy.get('.navbar .navbar-item')
    .should('contain', 'Home')
    .should('contain', 'Dropdown')
})
