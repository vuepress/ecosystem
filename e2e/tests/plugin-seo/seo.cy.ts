describe('seo', () => {
  const BASE = Cypress.env('E2E_BASE')

  it('have OGP', () => {
    cy.visit('/seo/')

      .get('head meta[property="og:url"]')
      .should(
        'have.attr',
        'content',
        `https://ecosystem-e2e-test.com${BASE}seo/`,
      )

      .get('head meta[property="og:site_name"]')
      .should('have.attr', 'content', 'VuePress Ecosystem E2E')

      .get('head meta[property="og:title"]')
      .should('have.attr', 'content', 'SEO Demo Page')

      .get('head meta[property="og:description"]')
      .should(
        'have.attr',
        'content',
        'Here is article excerpt. Content alt Here is main content of article. A B C ',
      )

      .get('head meta[property="og:type"]')
      .should('have.attr', 'content', 'article')

      .get('head meta[property="og:locale"]')
      .should('have.attr', 'content', 'en-US')

      .get('head meta[property="article:author"]')
      .should('have.attr', 'content', 'Mr.Hope')

      .get('head meta[property="article:tag"]')
      .should('have.attr', 'content', 'Demo')

      .get('head meta[property="article:published_time"]')
      .should('have.attr', 'content', '2021-01-01T00:00:00.000Z')
  })

  it('have JSONLD', () => {
    cy.visit('/seo/')

    cy.get('head script[type="application/ld+json"]')
      .should('have.length', 1)
      .each((el) => {
        const json = JSON.parse(el[0].innerText)

        expect(json['@context']).to.equal('https://schema.org')
        expect(json['@type']).to.equal('Article')
        expect(json.headline).to.equal('SEO Demo Page')
        expect(json.image).to.deep.equal([
          `https://ecosystem-e2e-test.com${BASE}logo.png`,
        ])
        expect(json.datePublished).to.equal('2021-01-01T00:00:00.000Z')
        expect(json).to.has.property('dateModified')
        expect(json.author[0]['@type']).to.equal('Person')
        expect(json.author[0].name).to.equal('Mr.Hope')
      })
  })
})
