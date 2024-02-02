describe('copyright', () => {
  it('disable selection', () => {
    cy.visit('/')
      .get('#app')
      .should('have.length', 1)
      .should('have.css', 'user-select', 'auto')

    cy.visit('/copyright/selection.html')
      .get('#app')
      .should('have.length', 1)
      .should('have.css', 'user-select', 'none')
  })
})
