describe('feed', () => {
  const BASE = Cypress.env('E2E_BASE')

  it('have atom feed', () => {
    cy.request(`${BASE}atom.xml`).then((res) => {
      expect(res.body).to.be.a('string')
      expect(res.body).to.contain('<?xml version="1.0"')
      expect(res.body).to.contain('<strong>article excerpt</strong>')
    })
    cy.request(`${BASE}atom.xsl`).then((res) => {
      expect(res.body).to.be.a('string')
      expect(res.body).to.contain('<?xml version="1.0"')
    })
  })

  it('have json feed', () => {
    cy.request(`${BASE}feed.json`).then((res) => {
      const jsonFeed = JSON.parse(res.body)

      expect(jsonFeed).to.be.a('object')
      expect(jsonFeed).to.have.property(
        'version',
        'https://jsonfeed.org/version/1.1',
      )
      expect(res.body).to.contain('<strong>article excerpt</strong>')
    })
  })

  it('have rss feed', () => {
    cy.request(`${BASE}rss.xml`).then((res) => {
      expect(res.body).to.be.a('string')
      expect(res.body).to.contain('<?xml version="1.0"')
      expect(res.body).to.contain('<strong>article excerpt</strong>')
    })
    cy.request(`${BASE}rss.xsl`).then((res) => {
      expect(res.body).to.be.a('string')
      expect(res.body).to.contain('<?xml version="1.0"')
    })
  })

  it('customize feed', () => {
    cy.request(`${BASE}atom.xml`).then((res) => {
      expect(res.body).to.contain('Custom feed title')
      expect(res.body).to.contain('Custom feed content.')
    })
    cy.request(`${BASE}feed.json`).then((res) => {
      expect(res.body).to.contain('Custom feed title')
      expect(res.body).to.contain('Custom feed description')
      expect(res.body).to.contain('Custom feed content.')
    })
    cy.request(`${BASE}rss.xml`).then((res) => {
      expect(res.body).to.contain('Custom feed title')
      expect(res.body).to.contain('Custom feed description')
      expect(res.body).to.contain('Custom feed content.')
    })
  })

  it('exclude feed', () => {
    cy.request(`${BASE}atom.xml`).then((res) => {
      expect(res.body).to.not.contain('Excluded feed page content.')
    })
    cy.request(`${BASE}feed.json`).then((res) => {
      expect(res.body).to.not.contain('Excluded feed page content.')
    })
    cy.request(`${BASE}rss.xml`).then((res) => {
      expect(res.body).to.not.contain('Excluded feed page content.')
    })
  })
})
