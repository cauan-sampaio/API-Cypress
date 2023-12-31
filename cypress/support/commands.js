// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add('token', (email, senha) => { 
   return cy.request({
        method: 'POST',
        url: 'http://localhost:3000/login',
        body: 	
        {
          "email": email,
          "password": senha
        }

    }).then((Response) =>{
        expect(Response.status).to.equal(200)
        return Response.body.authorization
    });
        
});

Cypress.Commands.add('cadastrarProduto', (token, produto, preco, descricao, quantidade) => { 
    return cy.request({
        method: 'POST',
        url: 'produtos',
        body: 	
        {
          "nome":produto,
          "preco": preco,
          "descricao": descricao,
          "quantidade": quantidade
        },
        headers : {authorization : token},
        failOnStatusCode: false
    
    });
});       