describe('copy-code', () => {
  it('have copy code button', () => {
    cy.visit('/markdown.html')
      .get('.copy-code-button')
      .then((el) => {
        expect(el.length).to.be.greaterThan(0)

        cy.wrap(el).click({ multiple: true })
        cy.wrap(el).should('have.class', 'copied')
      })
  })
})
