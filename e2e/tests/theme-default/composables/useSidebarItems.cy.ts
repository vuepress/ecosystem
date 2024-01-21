it("route has 'auto' sidebar", () => {
  cy.visit('/auto-sidebar/')
  cy.get('.theme-default-content').then((el) => {
    cy.wrap(el)
      .get('h1')
      .invoke('text')
      .should('be.not.empty')
      .then((text) => {
        cy.get('.sidebar-heading')
          .invoke('text')
          .should('contain', text.replace('#', '').trim())
      })
    cy.wrap(el)
      .get('h2')
      .each((header) => {
        cy.wrap(header)
          .invoke('text')
          .should('be.not.empty')
          .then((headerText) => {
            cy.get('a.sidebar-item').contains(
              headerText.replace('#', '').trim(),
            )
          })
      })
  })
})

it('route has custom sidebar', () => {
  cy.visit('/custom-sidebar/')
  cy.get('.theme-default-content').then((el) => {
    cy.wrap(el).get('.sidebar-heading').should('contain', 'custom-sidebar')
    cy.wrap(el)
      .get('a.sidebar-item')
      .should('contain', 'custom-child-1')
      .should('contain', 'custom-child-2')
  })
})
