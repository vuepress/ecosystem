it("route has 'heading' sidebar", () => {
  cy.visit('/heading-sidebar/')
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
  cy.visit('/sidebar/')
  cy.get('.theme-default-content').then((el) => {
    cy.wrap(el).get('.sidebar-heading').should('contain', 'Sidebar')
    cy.wrap(el)
      .get('a.sidebar-item')
      .should('contain', 'Sidebar Heading 1')
      .should('contain', 'Sidebar Heading 2')
  })
})
