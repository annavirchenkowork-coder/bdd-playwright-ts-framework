@sep25
Feature: Error message for the invalid card number

    As a user, I want to be informed when my card info has failed.

    # AC1: Immediate errors for wrong or too-short card numbers:
    #   - "Your card number is incomplete."
    #   - "Your card number is invalid."

    Background:
        Given User proceeds to the Review Payment page

    @sep25-1
    Scenario: Incomplete card number shows an error
        When User types "4242 4242 4242 424" into the Card Number field
        And User checks the Terms and Conditions checkbox
        Then The Card Number field error should be visible
        And The Card Number field error should contain "Your card number is incomplete."

    @sep25-2
    Scenario: Invalid card number shows an error
        When User types "4242 4242 4242 4246" into the Card Number field
        And User checks the Terms and Conditions checkbox
        Then The Card Number field error should be visible
        And The Card Number field error should contain "Your card number is invalid."