describe('template spec', () => {
  beforeEach(() => {
    cy.visit('/')
  })
  it('click login btn', ()=>{
    cy.get(':nth-child(4) > .nav-link').click()
    cy.get('#email').should("exist").type("a@gmail.com")
    cy.get('#password').should("exist").type("12345")
  })
})