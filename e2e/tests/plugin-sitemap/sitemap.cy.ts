describe('sitemap', () => {
  const BASE = Cypress.env('E2E_BASE')

  it('have sitemap xml', () => {
    cy.request(`${BASE}sitemap.xml`).then((res) => {
      expect(res.body).to.be.a('string')
      expect(res.body).to.contain('<?xml version="1.0"')
      expect(res.body).to.contain(
        `https://ecosystem-e2e-test.com${BASE}markdown.html</loc>`,
      )
    })
  })

  it('have sitemap xsl', () => {
    cy.request(`${BASE}sitemap.xsl`).then((res) => {
      expect(res.body).to.be.a('string')
      expect(res.body).to.contain('<?xml version="1.0"')
    })
  })

  it('frontmatter config', () => {
    cy.request(`${BASE}sitemap.xml`).then((res) => {
      expect(res.body).to.contain('<changefreq>yearly</changefreq>')
    })
  })

  it('exclude url', () => {
    cy.request(`${BASE}sitemap.xml`).then((res) => {
      expect(res.body).to.not.contain('/sitemap/config-exclude.html')
      expect(res.body).to.not.contain('/sitemap/frontmatter-exclude.html')
      expect(res.body).to.not.contain('/sitemap/meta-exclude.html')
    })
  })
})
