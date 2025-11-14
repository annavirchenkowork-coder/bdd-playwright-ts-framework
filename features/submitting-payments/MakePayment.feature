@sep23
Feature: Make a payment with a valid card

    As a user, I want to successfully complete my payment
    so that my enrollment is confirmed.

    Background:
        Given User proceeds to the Review Payment page

    @sep23-1
    Scenario: Successful payment with a valid test card
        When User enters a valid card number
        And User enters a valid expiration date
        And User enters a valid Security Code
        And User enters a valid ZIP code
        And User checks the Terms and Conditions checkbox
        And User clicks the Pay button
        Then The payment confirmation message should be displayed
        And The stepper should show all steps completed



