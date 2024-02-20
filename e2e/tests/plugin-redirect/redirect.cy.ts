describe('redirect', () => {
  const BASE = Cypress.env('E2E_BASE')

  it('frontmatter redirectFrom', () => {
    cy.visit('/redirect/from.html')

    cy.location('pathname').should('eq', `${BASE}redirect/final.html`)
  })

  it('frontmatter redirectTo', () => {
    cy.visit('/redirect/to.html')

    cy.location('pathname').should('eq', `${BASE}redirect/final.html`)
  })

  it('config', () => {
    cy.visit('/redirect/config.html')

    cy.location('pathname').should('eq', `${BASE}redirect/final.html`)

    cy.visit('/redirect/config/')

    cy.location('pathname').should('eq', `${BASE}redirect/final.html`)
  })
})
