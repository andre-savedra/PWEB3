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
  nextHeadButton: ()=> cy.get(".top-row .next-selector"),
  cartContainer: ()=> cy.get("#cart-page"),
  addCartButton: ()=> cy.get("#add-cart"),
  images: {
    head: ()=> cy.get("#top-image"),
    base: ()=> cy.get("#bottom-image"),
    leftArm: ()=> cy.get("#left-image"),
    rightArm: ()=> cy.get("#right-image"),
    torso: ()=> cy.get("#center-image"),
  }
};



const getPartIds = () => {
  let robot = {
    leftArmId: "",
    rightArmId: "",
    baseId: "",
    torsoId: "",
    headId: "",
  }

  el.images.head().invoke('attr', 'image-id').then(id=>{
    robot.headId = id ?? "";
  })
  el.images.base().invoke('attr', 'image-id').then(id=>{
    robot.baseId = id ?? "";
  })
  el.images.torso().invoke('attr', 'image-id').then(id=>{
    robot.torsoId = id ?? "";
  })
  el.images.leftArm().invoke('attr', 'image-id').then(id=>{
    robot.leftArmId = id ?? "";
  })
  el.images.rightArm().invoke('attr', 'image-id').then(id=>{
    robot.rightArmId = id ?? "";
  })
  
  return robot;
}


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
      expect(sourceImage).to.be.not.null
      // if (!sourceImage) {
      //   throw new Error("Source is empty");
      // }

      // img.should('not.be.empty')
    });
  });

  it("checking part changing", () => {
    cy.wait(2000)
    let imageBeforeId: Array<string> = [];
    
    //coletado todos os part selectors:
    //coletado todos os ids antes de avançar a peça
    el.partSelectorArray().each($part=>{
      //coleta a imagem e o botão next
      const getImage = ()=> cy.wrap($part.children(".part-images"))
      const next = ()=> cy.wrap($part.children(".next-selector"))

      getImage().invoke('attr', 'image-id').then(id=>{          
        if(id) imageBeforeId.push(id);
      });
      next().click();          
    });   
    //coletado os ids depois da mudança
    //verificado se estão diferentes!
    //clique no botão de voltar
    el.partSelectorArray().each(($part,index)=>{
      const getImage = ()=> cy.wrap($part.children(".part-images"));
      const previous = ()=> cy.wrap($part.children(".prev-selector"))

      getImage().invoke('attr', 'image-id').then(id=>{          
        expect(id !== undefined).to.be.true //opcional
        if(id) {
          expect(id).to.be.not.equal(imageBeforeId[index]);
        }
      });

      previous().click();      
    });

    //verifica se voltou aos ids originais
    el.partSelectorArray().each(($part,index)=>{
      const getImage = ()=> cy.wrap($part.children(".part-images"));

      getImage().invoke('attr', 'image-id').then(id=>{          
        expect(id !== undefined).to.be.true //opcional
        if(id) {
          expect(id).to.be.equal(imageBeforeId[index]);
        }
      });
    });    
  });
});


describe("testing cart page", () => {
  beforeEach(() => {
    cy.visit("/cart");
  });

  it("accessing cart page", () => {
    el.cartContainer().should("exist");
  });

  
  it("testing adding new robot in cart", () => {
    cy.visit("/build");
   
    //clica aleatóriamente em cada part selector
    el.partSelectorArray().each($part=>{
      const next = ()=> cy.wrap($part.children(".next-selector"))
      const times = Math.round(Math.random() * 10);
      console.log("times: ", times)
      
      for(let i=0; i<times; i++){
        next().click()
      }
    });

    let robot = getPartIds();
    cy.wait(1000);

    el.addCartButton().click();
    cy.visit("/cart");

    console.log("robot",robot)

  });


});
