describe('feed', () => {
  const BASE = Cypress.env('E2E_BASE')

  it('have atom feed', () => {
    cy.request(`${BASE}atom.xml`)
      .its('body')
      .should('be.a', 'string')
      .and('contain', '<?xml version="1.0"')
      .and('contain', '<strong>article excerpt</strong>')

    cy.request(`${BASE}atom.xsl`)
      .its('body')
      .should('be.a', 'string')
      .and('contain', '<?xml version="1.0"')
  })

  it('have json feed', () => {
    cy.request(`${BASE}feed.json`)
      .its('body')
      .should('be.a', 'object')
      .and((json) => {
        expect(JSON.stringify(json)).to.contain(
          '<strong>article excerpt</strong>',
        )
      })
      .and('have.a.property', 'version', 'https://jsonfeed.org/version/1.1')
  })

  it('have rss feed', () => {
    cy.request(`${BASE}rss.xml`)
      .its('body')
      .should('be.a', 'string')
      .and('contain', '<?xml version="1.0"')
      .and('contain', '<strong>article excerpt</strong>')

    cy.request(`${BASE}rss.xsl`)
      .its('body')
      .should('be.a', 'string')
      .and('contain', '<?xml version="1.0"')
  })

  it('customize feed', () => {
    cy.request(`${BASE}atom.xml`)
      .its('body')
      .should('be.a', 'string')
      .and('contain', 'Custom feed title')
      .and('contain', 'Custom feed content.')

    cy.request(`${BASE}feed.json`)
      .its('body')
      .should('be.a', 'object')
      .and((json) => {
        const content = JSON.stringify(json)

        expect(content).to.contain('Custom feed title')
        expect(content).to.contain('Custom feed description')
        expect(content).to.contain('Custom feed content.')
      })

    cy.request(`${BASE}rss.xml`)
      .its('body')
      .should('be.a', 'string')
      .and('contain', 'Custom feed title')
      .and('contain', 'Custom feed description')
      .and('contain', 'Custom feed content.')
  })

  it('exclude feed', () => {
    cy.request(`${BASE}atom.xml`)
      .its('body')
      .should('not.contain', 'Excluded feed page content.')

    cy.request(`${BASE}feed.json`)
      .its('body')
      .and((json) => {
        const content = JSON.stringify(json)

        expect(content).to.not.contain('Excluded feed page content.')
      })

    cy.request(`${BASE}rss.xml`)
      .its('body')
      .should('not.contain', 'Excluded feed page content.')
  })
})
