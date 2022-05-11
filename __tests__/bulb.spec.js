/// <reference types="cypress" />

// Welcome to Cypress!
//
// This spec file contains a variety of sample tests
// for a todo list app that are designed to demonstrate
// the power of writing tests in Cypress.
//
// To learn more about how Cypress works and
// what makes it such an awesome testing tool,
// please read our getting started guide:
// https://on.cypress.io/introduction-to-cypress

describe('React Christmas Lights', () => {
  beforeEach(() => {
    // Cypress starts out with a blank slate for each test
    // so we must tell it to visit our website with the `cy.visit()` command.
    // Since we want to visit the same URL at the start of all our tests,
    // we include it in our beforeEach function so that it runs before each test
    cy.visit('http://localhost:3000')
  })

  it('displays 5 circle items by default', () => {
    // We use the `cy.get()` command to get all elements that match the selector.
    // Then, we use `should` to assert that there are two matched items,
    // which are the two default items.
    cy.get('.circle').should('have.length', 5)


  })

  it('can add new row', () => {
    // We'll store our item text in a variable so we can reuse it
    const newItem = 1

    cy.get('[data-test=add-row]').type(`${newItem}{enter}`)

    cy.get('.circle').should('have.length', 5)

  })
  it('can remove a new bulb', () => {
    // We'll click on the "remove bulb" button in order to remove
    cy.get('[data-test=remove-bulb]').click().click();

    cy.get('.circle')
      .should('have.length', 4)
      .first()
   
  })


  it('can add a new bulb', () => {
    // Adds New Bulb
 
    cy.contains('Add Bubble').click();

    cy.get('.circle')
      .should('have.length', 5)
      .first()

  })

})
