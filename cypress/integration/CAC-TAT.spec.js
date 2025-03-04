/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    const THREE_SECONDS_IN_MS = 3000
    beforeEach(function() {
        cy.visit('./src/index.html') 
    })
    it('Verifica o título da aplicação', function() {
        cy.title().should('be.equal' , 'Central de Atendimento ao Cliente TAT')
    })

    it('Preencha os campos obrigatórios e envia o formulário' , function() {
        const longText = 'Teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste.'

        cy.clock()

         cy.get('#firstName').type('Carla')
         cy.get('#lastName').type('Oliveira')
         cy.get('#email').type('carla.suporteam@gmail.com')
         cy.get('#open-text-area').type(longText,  { delay: 0})
         cy.contains('button', 'Enviar').click()

         cy.get('.success').should('be.visible')

         cy.tick(THREE_SECONDS_IN_MS)

         cy.get('.success').should('not.be.visible')
    })

    it('Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida' , function() {
        cy.clock()

        cy.get('#firstName').type('Carla')
        cy.get('#lastName').type('Oliveira')
        cy.get('#email').type('carla.suporteam@gmail,com')
        cy.get('#open-text-area').type('teste')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')

        cy.tick(THREE_SECONDS_IN_MS)

        cy.get('.error').should('not.be.visible')
    })

    it('Campo telefone continua vazio quando preenchido com valor não-numérico', function() {
        cy.get('#phone')
            .type('abcdefghijklmnopqrstuvwxyz')
            .should('have.value', '')
    })

    it('Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
        cy.clock()

        cy.get('#firstName').type('Carla')
        cy.get('#lastName').type('Oliveira')
        cy.get('#email').type('carla.suporteam@gmail.com')
        cy.get('#phone-checkbox').click()
        cy.get('#open-text-area').type('teste')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')

        cy.tick(THREE_SECONDS_IN_MS)

        cy.get('.error').should('not.be.visible')
    })

    it('Preenche e limpa os campos nome, sobrenome, email e telefone', function() {
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

    it('Exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() {
        cy.clock()

        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')

        cy.tick(THREE_SECONDS_IN_MS)

        cy.get('.error').should('not.be.visible')
    })

    it('Envia o formulário com sucesso usando o comando customizado', function() {
        cy.clock()

        cy.fillMandatoryFieldsAndSubmit()

        cy.get('.success').should('be.visible')

        cy.tick(THREE_SECONDS_IN_MS)

        cy.get('.success').should('not.be.visible')

    })
    
    //Aulas e Exercicios 3

    it('Seleciona um produto (Youtube) por seu texto',function() {
        cy.get('#product')
            .select('YouTube')
            .should('have.value', 'youtube')
    })

    it('Seleciona um produto (Mentoria) por seu valor (Value)',function() {
        cy.get('#product')
            .select('mentoria')
            .should('have.value' , 'mentoria')
    })

    it('Seleciona um produto (Blog) por seu indice',function() {
        cy.get('#product')
            .select(1)
            .should('have.value', 'blog')
    })

    //Exercicios da aula 4

    it('Marca o tipo de atendimento "Feedback"',function() {
        cy.get('input[type="radio"][value="feedback"]')
            .check()
            .should('have.value', 'feedback')
    })

    it('Marca cada tipo de atendimento',function() {
        cy.get('input[type="radio"]')
            .should('have.length', 3)
            .each(function($radio) {
                cy.wrap($radio).check()
                cy.wrap($radio).should('be.checked')
            })
    })

     //Exercicios da aula 5

     it('Marca ambos checkboxes, depois desmarcar o último', function() {
        cy.get('input[type="checkbox"]')
            .check()
            .should('be.checked')
            .last()
            .uncheck()
            .should('not.be.checked')
     })

     it('Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
        cy.clock()

        cy.get('#firstName').type('Carla')
        cy.get('#lastName').type('Oliveira')
        cy.get('#email').type('carla.suporteam@gmail.com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('teste')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')

        cy.tick(THREE_SECONDS_IN_MS)

        cy.get('.error').should('not.be.visible')
     })

     //Exercicios Aula 6

     it('Seleciona um arquivo da pasta fixture', function() {
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json')
            .should(function($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            })
     })

     it('Seleciona um arquivo simulando um drag-and-drop', function() {
        cy.get('input[type="file"]')
        .should('not.have.value')
        .selectFile('./cypress/fixtures/example.json', { action: 'drag-drop'} )
        .should(function($input) {
            expect($input[0].files[0].name).to.equal('example.json')
        })
     })

    it('Seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function() {
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]')
            .selectFile('@sampleFile')
            .should(function($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    it('Verifica que a política de privacidade abre em outra aba sem necessidade de um clique', function() {
        cy.get('#privacy a').should('have.attr', 'target', '_blank')
    })

    it('Acessa a página da política de privacidade removendo o target e então clicando no link', function() {
        cy.get('#privacy a')
            .invoke('removeAttr', 'target')
            .click()

        cy.contains('Talking About Testing').should('be.visible')
    })

    it('Exibe e esconde as mensagens de sucesso e erro usando o .invoke', () => {
        cy.get('.success')
          .should('not.be.visible')
          .invoke('show')
          .should('be.visible')
          .and('contain', 'Mensagem enviada com sucesso.')
          .invoke('hide')
          .should('not.be.visible')
        cy.get('.error')
          .should('not.be.visible')
          .invoke('show')
          .should('be.visible')
          .and('contain', 'Valide os campos obrigatórios!')
          .invoke('hide')
          .should('not.be.visible')
      })

      it('Preenche a area de texto usando o comando invoke', function(){
        const longText = Cypress._.repeat('0123456789', 15)

        cy.get('#open-text-area')
            .invoke('val', longText)
            .should('have.value', longText)
      })

      
})
  
