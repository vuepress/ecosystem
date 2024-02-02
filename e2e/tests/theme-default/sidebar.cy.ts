describe('has heading sidebar', () => {
  it('frontmatter', () => {
    cy.visit('/sidebar/auto.html')

    cy.get('a.sidebar-item')
      .should('contain', 'Sidebar Heading 1')
      .should('contain', 'Sidebar Heading 2')
  })

  it('config', () => {
    cy.visit('/sidebar/heading/1.html')

    cy.get('.theme-default-content h1')
      .invoke('text')
      .should('be.not.empty')
      .then((text) => {
        cy.get('.sidebar-heading')
          .invoke('text')
          .should('contain', text.replace('#', '').trim())
      })

    cy.get('.theme-default-content h2').each((header) => {
      cy.wrap(header)
        .invoke('text')
        .should('be.not.empty')
        .then((headerText) => {
          cy.get('a.sidebar-item').contains(headerText.replace('#', '').trim())
        })
    })
  })
})

it('has configured sidebar', () => {
  cy.visit('/sidebar/config/1.html')

  cy.get('a.sidebar-item')
    .should('contain', 'sidebar 1')
    .should('contain', 'sidebar 2')
})
