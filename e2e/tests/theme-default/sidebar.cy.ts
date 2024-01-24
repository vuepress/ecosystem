it('has heading sidebar', () => {
  cy.visit('/sidebar/')
  cy.get('.theme-default-content').then((el) => {
    cy.wrap(el)
      .get('a.sidebar-item')
      .should('contain', 'Sidebar Heading 1')
      .should('contain', 'Sidebar Heading 2')
  })
})

it('has configured sidebar', () => {
  cy.visit('/sidebar/1.html')
  cy.get('.theme-default-content').then((el) => {
    cy.wrap(el)
      .get('a.sidebar-item')
      .should('contain', 'sidebar 1')
      .should('contain', 'sidebar 2')
  })
})
