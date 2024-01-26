describe('homepage', () => {
  it('has hero info', () => {
    const title = 'VuePress Ecosystem E2E'
    const description = 'VuePress Ecosystem E2E Test Site'
    const heroImage = 'https://v2.vuepress.vuejs.org/images/hero.png'

    cy.visit('/')
    cy.get('.hero').then((el) => {
      cy.wrap(el)
        .get('img')
        .should('have.attr', 'src', heroImage)
        .should('have.attr', 'alt', title)

      cy.wrap(el).get('#main-title').should('have.text', title)

      cy.wrap(el).get('.description').should('have.text', description)

      cy.wrap(el)
        .get('.actions')
        .then((el) => {
          cy.wrap(el).get('.action-button').should('have.length', 2)

          cy.wrap(el)
            .get('.action-button')
            .eq(0)
            .should('have.attr', 'href', '/action1.html')
            .should('have.attr', 'aria-label', 'Action1')
            .contains('Action1')

          cy.wrap(el)
            .get('.action-button')
            .eq(1)
            .should('have.attr', 'href', '/action2.html')
            .should('have.attr', 'aria-label', 'Action2')
            .contains('Action2')
        })
    })

    cy.get('.features .feature').then((el) => {
      cy.wrap(el).should('have.length', 3)
      ;[1, 2, 3].forEach((i) => {
        cy.wrap(el)
          .eq(i - 1)
          .get('h2')
          .contains('Feature' + i)
        cy.wrap(el)
          .eq(i - 1)
          .get('p')
          .contains('Detail' + i)
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
