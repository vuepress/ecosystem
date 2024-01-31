describe('seo', () => {
  const BASE = Cypress.env('E2E_BASE')

  it('have OGP', () => {
    cy.visit('/seo/')

    cy.get('head meta[property="og:url"]').should(
      'have.attr',
      'content',
      `https://ecosystem-e2e-test.com${BASE}seo/`,
    )
    cy.get('head meta[property="og:site_name"]').should(
      'have.attr',
      'content',
      'VuePress Ecosystem E2E',
    )
    cy.get('head meta[property="og:title"]').should(
      'have.attr',
      'content',
      'SEO Demo Page',
    )
    cy.get('head meta[property="og:description"]').should(
      'have.attr',
      'content',
      'Here is article excerpt. Content alt Here is main content of article. A B C ',
    )
    cy.get('head meta[property="og:type"]').should(
      'have.attr',
      'content',
      'article',
    )
    cy.get('head meta[property="og:locale"]').should(
      'have.attr',
      'content',
      'en-US',
    )
    cy.get('head meta[property="article:author"]').should(
      'have.attr',
      'content',
      'Mr.Hope',
    )
    cy.get('head meta[property="article:tag"]').should(
      'have.attr',
      'content',
      'Demo',
    )
    cy.get('head meta[property="article:published_time"]').should(
      'have.attr',
      'content',
      '2021-01-01T00:00:00.000Z',
    )
  })

  it('have JSONLD', () => {
    cy.visit('/seo/')

    cy.get('head script[type="application/ld+json"]').then((el) => {
      const json = JSON.parse(el[0].innerText)

      expect(json).to.deep.equal({
        '@context': 'https://schema.org',
        '@type': 'Article',
        'headline': 'SEO Demo Page',
        'image': [`https://ecosystem-e2e-test.com${BASE}logo.png`],
        'datePublished': '2021-01-01T00:00:00.000Z',
        'dateModified': null,
        'author': [{ '@type': 'Person', 'name': 'Mr.Hope' }],
      })
    })
  })
})
