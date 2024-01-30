// const BASE = Cypress.env('E2E_BASE')

describe('sitemap', () => {
  it('have sitemap', () => {
    cy.request('/sitemap.xml').then((res) => {
      expect(res.body).to.be.a('string')
      expect(res.body).to.contain('<?xml version="1.0"')
      expect(res.body).to.contain('/markdown.html')
    })
  })

  it('frontmatter config', () => {
    cy.request('/sitemap.xml').then((res) => {
      expect(res.body).to.contain(
        '/sitemap/frontmatter.html</loc><changefreq>yearly</changefreq></url><',
      )
    })
  })

  it('exclude url', () => {
    cy.request('/sitemap.xml').then((res) => {
      expect(res.body).to.not.contain('/sitemap/config-exclude.html')
      expect(res.body).to.not.contain('/sitemap/frontmatter-exclude.html')
      expect(res.body).to.not.contain('/sitemap/meta-exclude.html')
    })
  })
})
