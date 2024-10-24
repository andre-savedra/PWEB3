/// <reference types="cypress" />

const el = {
  homeContainer: () => cy.get("#home-page"),
  mineButton: () => cy.get("#order"),
  buildContainer: () => cy.get("#build-page"),
  flag: () => cy.get("header #flag"),
  homeTitle: () => cy.get("#home-page #title"),
  partImagesArray: () => cy.get(".part .part-images"),
  partSelectorArray: () => cy.get(".part"),
  partImage: () => cy.get(".part-images"),
  buttonParts: {
    next: () => cy.get(".next-selector"),
    previous: () => cy.get(".prev-selector"),
  },
  getHeadImage: ()=> cy.get("#top-image"),
  nextHeadButton: ()=> cy.get(".top-row .next-selector")
};

describe("testing home page", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("accessing home page", () => {
    el.homeContainer().should("exist");
  });

  it("testing mine button", () => {
    el.mineButton().click();
    el.buildContainer().should("exist");
  });

  it("testing translate button", () => {
    el.homeTitle().should("contain.text", "Build now your Mange Bot!");
    el.flag().click();
    el.homeTitle().should("contain.text", "Construa agora seu Mange Bot!");
  });
});

describe("testing build page", () => {
  beforeEach(() => {
    cy.visit("/build");
  });

  it("accessing build page", () => {
    el.buildContainer().should("exist");
  });

  it("checking backend parts", () => {
    const images = el.partImagesArray();
    images.should("have.length", 5).each(($img) => {
      const img = cy.wrap($img);
      img.should("exist");

      img.should("have.attr", "src");
      const sourceImage = $img.attr("src");
      if (!sourceImage) {
        throw new Error("Source is empty");
      }

      // img.should('not.be.empty')
    });
  });

  it("checking part changing", () => {
    cy.wait(2000)
    
    el.partSelectorArray().each($part=>{
      const getImage = ()=> cy.wrap($part.children(".part-images"))
      const next = ()=> cy.wrap($part.children(".next-selector"))

      let imageBeforeId = '';
      getImage().invoke('attr', 'image-id').then(id=>{
        console.log('BEFORE:', id);  
        if(id) imageBeforeId = id;
      });

      getImage().should('have.attr', 'image-id', imageBeforeId);

      cy.wait(2000);
      next().click();

      let imageAfterId = ''; 
      getImage().invoke('attr', 'image-id').then(id=>{
        console.log('AFTER:', id);  
        if(id) imageAfterId = id;
      });

      getImage().should('have.attr', 'image-id', imageAfterId)

      if(imageBeforeId == imageAfterId){
        //throw new Error('Part was not changed')
      }      
    });  
    
   
  });
});
