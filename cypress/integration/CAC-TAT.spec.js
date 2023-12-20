/// <reference types="Cypress" />

describe('0 Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function() {
        cy.visit('./src/index.html') 
    })
    it('Verifica o título da aplicação', function() {
        cy.title().should('be.equal' , 'Central de Atendimento ao Cliente TAT')
    })

    it('1 Preencha os campos obrigatórios e envia o formulário' , function() {
        const longText = 'Teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste.'
         cy.get('#firstName').type('Carla')
         cy.get('#lastName').type('Oliveira')
         cy.get('#email').type('carla.suporteam@gmail.com')
         cy.get('#open-text-area').type(longText,  { delay: 0})
         cy.contains('button', 'Enviar').click()

         cy.get('.success').should('be.visible')
    })

    it('2 Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida' , function() {
        cy.get('#firstName').type('Carla')
        cy.get('#lastName').type('Oliveira')
        cy.get('#email').type('carla.suporteam@gmail,com')
        cy.get('#open-text-area').type('teste')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })

    it('3 Campo telefone continua vazio quando preenchido com valor não-numérico', function() {
        cy.get('#phone')
            .type('abcdefghijklmnopqrstuvwxyz')
            .should('have.value', '')
    })

    it('4 Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
        cy.get('#firstName').type('Carla')
        cy.get('#lastName').type('Oliveira')
        cy.get('#email').type('carla.suporteam@gmail.com')
        cy.get('#phone-checkbox').click()
        cy.get('#open-text-area').type('teste')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })

    it('5 Preenche e limpa os campos nome, sobrenome, email e telefone', function() {
        cy.get('#firstName')
            .type('Carla')
            .should('have.value', 'Carla')
            .clear()
            .should('have.value', '')

        cy.get('#lastName')
            .type('Oliveira')
            .should('have.value', 'Oliveira')
            .clear()
            .should('have.value', '')

        cy.get('#email')
            .type('carla.suporteam@gmail.com')
            .should('have.value', 'carla.suporteam@gmail.com')
            .clear()
            .should('have.value', '')

        cy.get('#phone')
            .type('123456789')
            .should('have.value', '123456789')
            .clear()
            .should('have.value', '')

        cy.get('#open-text-area')
            .type('Teste teste')
            .should('have.value', 'Teste teste')
            .clear()
            .should('have.value', '')
    })

    it('6 Exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() {
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })

    it('7 Envia o formulário com sucesso usando o comando customizado', function() {
        cy.fillMandatoryFieldsAndSubmit()

        cy.get('.success').should('be.visible')
    })
    


  })
  
