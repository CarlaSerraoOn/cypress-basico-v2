Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function() {
    cy.get('#firstName').type('Carla')
    cy.get('#lastName').type('Oliveira')
    cy.get('#email').type('carla.suporteam@gmail.com')
    cy.get('#open-text-area').type('teste')
    cy.contains('button', 'Enviar').click()
})