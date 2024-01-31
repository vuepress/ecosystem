describe('copy-code', () => {
  it('have copy code button', () => {
    cy.visit('/markdown.html')
      .get('.copy-code-button')
      .then((el) => {
        expect(el.length).to.be.greaterThan(0)

        el.each((i, el) => {
          el.click()

          cy.get('.copy-code-button').eq(i).should('have.class', 'copied')
        })
      })
  })
})
