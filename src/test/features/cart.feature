Feature: Cart
    As a user,
    I want to add a new product to my cart,
    I want to see all the products in my cart
    I want to see the total price

    Scenario: Add a product to the cart
        Given an empty cart
        When I add a product
        Then the product should appear in the cart
        And the total price should be updated

    Scenario: Add multiple products to the cart
        Given a cart with one product
        When I add two new product
        Then both products should appear in the cart
        And the total price should be updated
    Scenario: Add multiple times the same product to the cart
        Given a cart with three product
        When I add the same product two times
        Then the product should appear on the cart with quantity "2"
        And the total price should be updated
    Scenario: Clear the cart
        Given a cart with multiple products
        When I clear the cart
        Then the cart should be empty
        And the total price should be zero