@sep27
Feature: Error messages for the invalid expiration date

    As a user, I want to be informed when my card's expiration date is incorrect,
    so that I can fix it before submitting my payment.

    # AC1: Show an error if the expiration date is too short or malformed:
    #      "Your card's expiration date is incomplete."
    # AC2: Show an error if the expiration year is in the past:
    #      "Your card's expiration year is in the past."

    Background:
        Given User proceeds to the Review Payment page

    @sep27-1
    Scenario: Short expiration date shows "expiration date is incomplete" error
        When User types "12" into the Expiration Date field
        And User checks the Terms and Conditions checkbox
        Then The Expiration Date field error should be visible
        And The Expiration Date field error should contain "Your card’s expiration date is incomplete."

    @sep27-2
    Scenario: Past expiration date shows "expiration year is in the past" error
        When User types "01/20" into the Expiration Date field
        And User checks the Terms and Conditions checkbox
        Then The Expiration Date field error should be visible
        And The Expiration Date field error should contain "Your card’s expiration year is in the past."