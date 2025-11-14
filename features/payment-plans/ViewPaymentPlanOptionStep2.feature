@sep17
Feature: View payment plan options in Step 2

    As a customer, I should be able to see payment plan options in Step 2.

    # AC1: Verify Upfront plan card
    # AC2: Verify Installments plan card

    Background:
        Given User is on the enrollment page
        And User completed the start application step

    @sep17-1
    Scenario: Upfront payment plan displays correct details
        Then The "Upfront" plan panel should be visible
        And The first row of the "Upfront" plan should display "Upfront"
        And The second row of the "Upfront" plan should display "$400 pay once"
        And There should be exactly 1 "Upfront" plan option

    @sep17-2
    Scenario: Installments payment plan displays correct details
        Then The "Installments" plan panel should be visible
        And The first row of the "Installments" plan should display "5 Installments"
        And The second row of the "Installments" plan should display "$100 per month"
        And There should be exactly 1 "Installments" plan option

    @sep17-3
    Scenario: Each plan card includes Coupons badge
        Then The "Upfront" plan should show a "Coupons available" control
        And The "Installments" plan should show a "Coupons available" control