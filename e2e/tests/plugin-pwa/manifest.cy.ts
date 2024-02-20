describe('pwa manifest', () => {
  const BASE = Cypress.env('E2E_BASE')

  it('have manifest', () => {
    cy.request(`${BASE}manifest.webmanifest`)
      .its('body')
      .should('be.a', 'object')

    cy.request(`${BASE}manifest.webmanifest`)
      .its('body')
      .should('be.a', 'object')
      .should('have.a.property', 'name', 'VuePress Ecosystem E2E')

    cy.request(`${BASE}manifest.webmanifest`)
      .its('body')
      .should('have.a.property', 'short_name', 'VuePress Ecosystem E2E')

    cy.request(`${BASE}manifest.webmanifest`)
      .its('body')
      .should(
        'have.a.property',
        'description',
        'VuePress Ecosystem E2E Test Site',
      )

    cy.request(`${BASE}manifest.webmanifest`).its('body')

    cy.request(`${BASE}manifest.webmanifest`)
      .its('body')
      .should('have.a.property', 'lang', 'en-US')

    cy.request(`${BASE}manifest.webmanifest`)
      .its('body')
      .should('have.a.property', 'start_url', BASE)

    cy.request(`${BASE}manifest.webmanifest`)
      .its('body')
      .should('have.a.property', 'display', 'standalone')

    cy.request(`${BASE}manifest.webmanifest`)
      .its('body')
      .should('have.a.property', 'theme_color', '#46bd87')

    cy.request(`${BASE}manifest.webmanifest`)
      .its('body')
      .should('have.a.property', 'background_color', '#ffffff')

    cy.request(`${BASE}manifest.webmanifest`)
      .its('body')
      .should('have.a.property', 'icons')

    cy.request(`${BASE}manifest.webmanifest`)
      .its('body')
      .should('have.a.property', 'orientation', 'portrait-primary')
  })

  it('have manifest links', () => {
    cy.visit('/')
    cy.get('link[rel="manifest"]').should(
      'have.attr',
      'href',
      `${BASE}manifest.webmanifest`,
    )

    cy.visit('/404.html')
    cy.get('link[rel="manifest"]').should(
      'have.attr',
      'href',
      `${BASE}manifest.webmanifest`,
    )
  })
})
