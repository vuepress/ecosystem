describe('sitemap', () => {
  const BASE = Cypress.env('E2E_BASE')

  it('have sitemap', () => {
    cy.request(`${BASE}sitemap.xml`).then((res) => {
      expect(res.body).to.be.a('string')
      expect(res.body).to.contain('<?xml version="1.0"')
      expect(res.body).to.contain('/markdown.html')
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
