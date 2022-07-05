/// <reference types="cypress" />

import "cypress-real-events/support";

context('Verify product can be add to cart', () => {

    before(function (){
        //access fixture data
        cy.fixture('example').then(function(product){
            this.product=product
        })
        cy.visit('https://floward.com/')
    })

    it('Add product to the cart', function () {
        //Verify that landing page
        cy.get('.landing-bg').should('be.visible')

        // Select the country
        cy.contains('Kuwait').should('be.visible').as('Kuwait')
        cy.get('@Kuwait').click()

        // Verify category present and then select it
        cy.get('a:contains(" Flowers and Chocolates ")')
        .should('be.visible')
        .click()

        // Verify product is available then select it
        const productName = this.product.product_name
        cy.get(`img[alt="${productName}"`).as('product')
        cy.get('@product').should('be.visible').realHover()
        cy.get('@product').parentsUntil('.image').parent().siblings().last().children().last().contains('Add to cart').click({force:true})

        // Verify cart if product added successfully
        cy.get('checkout-addons').siblings().last().find('button:contains(" Continue ")').should('be.visible').click({timeout:8000})
        cy.get('.cart-item').find('h5.prod-name').should('contain',productName)
    })
})