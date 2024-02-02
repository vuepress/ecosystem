describe('copy-code', () => {
  it('have copy code button', () => {
    cy.visit('/copy-code/')
      .get('.theme-default-content')
      .within(() => {
        cy.get('.copy-code-button')
          .should('have.lengthOf.greaterThan', 0)
          .each((el) => {
            cy.wrap(el).click()
            cy.wrap(el).should('have.class', 'copied')
            cy.window()
              .then((win) => win.navigator.clipboard.readText())
              .should('eq', `const a = 1\nconst b = 2\n`)

            cy.window().then((win) => win.navigator.clipboard.writeText(''))
          })
      })
  })
})
