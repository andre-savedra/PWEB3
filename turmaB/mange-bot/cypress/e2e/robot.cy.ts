/// <reference types="cypress" />


const el = {
  homeContainer: ()=> cy.get("#home-page"),
  mineButton: ()=> cy.get("#order"),
  buildContainer: ()=> cy.get("#build-page"),
  flag: ()=> cy.get("header #flag"),
  homeTitle: ()=> cy.get("#home-page #title")
}


describe('testing home page', () => {
  beforeEach(()=> {
    cy.visit('/')
  })
  
  it('accessing home page', () => {   
    el.homeContainer().should('exist')      
  })

  it('testing mine button', () => {        
    el.mineButton().click()
    el.buildContainer().should('exist')      
  })

  it('testing translate button', () => {        
    el.homeTitle().should("contain.text","Build now your Mange Bot!")
    el.flag().click()
    el.homeTitle().should("contain.text","Construa agora seu Mange Bot!")
  })

})

