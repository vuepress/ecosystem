describe('homepage', () => {
  const BASE = Cypress.env('E2E_BASE')

  it('has hero info', () => {
    cy.visit('/')

    cy.get('.hero').within(() => {
      const title = 'VuePress Ecosystem E2E'
      const description = 'VuePress Ecosystem E2E Test Site'
      const heroImage = 'https://v2.vuepress.vuejs.org/images/hero.png'

      cy.get('img')
        .should('have.attr', 'src', heroImage)
        .should('have.attr', 'alt', title)

      cy.get('#main-title').should('have.text', title)

      cy.get('.description').should('have.text', description)

      cy.get('.action-button')
        .should('have.length', 2)
        .each((el, index) => {
          cy.wrap(el)
            .should('have.attr', 'href', `${BASE}action${index + 1}.html`)
            .should('have.attr', 'aria-label', `Action${index + 1}`)
            .contains(`Action${index + 1}`)
        })
    })
  })

  it('has feature', () => {
    cy.visit('/')

    cy.get('.feature').then((el) => {
      cy.wrap(el)
        .should('have.length', 3)
        .each((el, index) => {
          cy.wrap(el)
            .get('h2')
            .contains(`Feature${index + 1}`)

          cy.wrap(el)
            .get('p')
            .contains(`Detail${index + 1}`)
        })
    })
  })

  it('has content', () => {
    cy.visit('/')

    cy.get('.theme-default-content').contains('HomePage Content')
  })

  it('has footer', () => {
    cy.visit('/')

    cy.get('.footer').contains('Footer Content')
  })
})
