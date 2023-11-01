/// <reference types = "cypress" />
describe('Teste da Funcionalidades Produtos', () => {
    let token;
    before(() => {
        cy.token('fulano@qa.com', 'teste').then((tkn) => {token = tkn;
        });
    });
    it('Listar produtos', () => {
        cy.request({
            method: 'GET',
            url: 'produtos',
        }).then((response)=>{
            expect(response.body.produtos[0].nome).to.equal('Logitech MX Vertical')
            expect(response.status).to.equal(200)
            expect(response.body).to.have.property('produtos')
            expect(response.duration).to.be.lessThan(20)
    })
    });
    it('Cadastrar produtos', () => {
        let produto = `Anão ${Math.random() * 1000000}`
        cy.request({
            method: 'POST',
            url: 'produtos',
            body: 	
            {
              "nome": produto,
              "preco": 1000,
              "descricao": "Anão macho",
              "quantidade": 3
            },
            headers : {authorization : token}
            
            
        }).then((Response) =>{
            expect(Response.status).to.equal(400)
            expect(Response.body.message).to.equal('Cadastro realizado com sucesso')
        })
    });
    it('Deve validar mensagem de erro ao cadastrar produto repetido', () => {
      cy.cadastrarProduto(token, 'Anão',20, 'Anão gay', 300).then((Response) =>{
            expect(Response.status).to.equal(400)
            expect(Response.body.message).to.equal('Já existe produto com esse nome')
        })
        
    });
    it('Deve editar um produto já cadastrado', () => {
        cy.request('produtos').then(response => {
           let id = response.body.produtos[0]._id
            cy.request({
                method: 'PUT',
                url:  `produtos/${id}`,
                headers : {authorization : token},
                body: 	
                {
                  "nome": "Anão 10 editado",
                  "preco": 1000,
                  "descricao": "Anão crackudo",
                  "quantidade": 467
                }
            })
        } )
    });
    it('Deve editar um produto cadastrado previamente', () => {
        let produto = `Anão ${Math.random() * 1000000}`
        cy.cadastrarProduto(token, produto, 20, 'Anão gay', 300)
        .then(response =>{
            let id = response.body._id
            cy.request({
                method: 'PUT',
                url:  `produtos/${id}`,
                headers : {authorization : token},
                body: 	
                {
                  "nome": produto,
                  "preco": 100003,
                  "descricao": "Anão crackudo e FEC",
                  "quantidade": 46323
                }
        });
        }) 
    });
    it.only('Deve deletar um produto previamente cadastrado', () => {
        let produto = `Anão ${Math.random() * 1000000}`
        cy.cadastrarProduto(token, produto, 20, 'Anão gay', 300)
        .then(response => {
        let id = response.body._id
        cy.request({
            method: 'DELETE',
            url:  `produtos/${id}`,
            headers : {authorization : token}
        }).then(response => {
            expect(response.body.message).to.equal('Registro excluído com sucesso')
            expect(response.status).to.equal(200)
        })
    })   
    });
});