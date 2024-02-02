describe('copy-code', () => {
  it('have copy code button', () => {
    cy.visit('/copy-code/')
      .get('.theme-default-content')
      .within(() => {
        cy.get('.vp-copy-code-button')
          .should('have.lengthOf.greaterThan', 0)
          .each((el) => {
            cy.wrap(el).click()
            cy.wrap(el).should('have.class', 'copied')
            cy.window()
              .then((win) => win.navigator.clipboard.readText())
              .should('match', /const a = 1\r?\nconst b = 2\r?\n/)

            cy.window().then((win) => win.navigator.clipboard.writeText(''))
          })
      })
  })
})
