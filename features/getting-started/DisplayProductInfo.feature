@sep09
Feature: Display the product information

    As a customer, I should be able to see the product information.

    #* AC1: The product name should be displayed on the information card.
    #* AC2: The product name on the information card matches the product name on the left side of the screen.
    #* AC3: The price of the product should be displayed.
    #* AC4: The text indicating a flexible payment plan should be available and displayed.
    #* AC5: The program start date should be displayed.
    #* AC6: The return policy and the final date for returns should be displayed.

    Background:
        Given User is on the enrollment page

    @sep09-1
    Scenario: Product name is shown on the information card (AC1)
        Then The product name should be visible on the information card

    @sep09-2
    Scenario: Product name matches across page and information card (AC2)
        Then The product name on the left header should match the information card title

    @sep09-3
    Scenario: Price is displayed with original and discounted amounts (AC3)
        Then The discounted price should be shown
        And The original price should be shown with strikethrough
        And The discounted price should equal the original price minus the upfront discount

    @sep09-4
    Scenario: Flexible payment plan text is displayed (AC4)
        Then The flexible payments plan availability text should be visible

    @sep09-5
    Scenario: Program start date is displayed (AC5)
        Then The program start date should be visible and match test data

    @sep09-6
    Scenario: Refund policy text and final refund date are displayed (AC6)
        Then The refund policy text should be visible
        And The refund end date should be visible and match test data