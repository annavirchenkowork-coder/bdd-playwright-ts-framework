@sep29
Feature: Error message for the invalid CVC number

    As a user, I want to be informed when the CVC number I enter is incorrect or too short.

    # AC1: Show inline error when CVC is too short
    #       "Your card's security code is incomplete."

    Background:
        Given User proceeds to the Review Payment page

    @sep29-1
    Scenario: Short CVC shows inline error
        When User types "12" into the Security Code field
        And User checks the Terms and Conditions checkbox
        Then The Security Code field error should be visible
        And The Security Code field error should contain "Your card’s security code is incomplete."