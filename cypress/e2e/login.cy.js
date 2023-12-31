/// <reference types = "cypress" />

describe('Login - testes da API ServRest', () => {
    it('Deve fazer login com sucesso', () => {
        cy.request({
            method: 'POST',
            url: 'http://localhost:3000/login',
            body: 	
            {
              "email": "fulano@qa.com",
              "password": "teste"
            }
        }).then((Response) =>{
            expect(Response.status).to.equal(200)
            describe('template spec', () => {
                it('passes', () => {
                  cy.visit('https://example.cypress.io')
                })
              })
            expect(Response.body.message).to.equal('Login realizado com sucesso')
            cy.log(Response.body.authorization)

        })
        
    });
    
});