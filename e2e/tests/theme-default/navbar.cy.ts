it('has navbar', () => {
  cy.visit('/')
  cy.get('.theme-default-content').then((el) => {
    cy.wrap(el)
      .get('.navbar .navbar-item')
      .should('contain', 'Home')
      .should('contain', 'Dropdown')
  })
})
