@sep14
Feature: Selecting a payment plan

    As a customer, I want to choose a payment plan from the available options
    so that I can pick the one that best suits my needs.

    # AC1: Selecting any plan highlights that option.
    # AC2: Selecting any plan activates the Next button.
    # AC3: The user can change plan selection anytime before proceeding.

    Background:
        Given User is on the enrollment page
        And User completed the start application step

    @sep14-1
    Scenario: Selecting the Upfront plan highlights it and activates Next
        Then The next button on step two should be disabled by default
        When User selects upfront payment plan
        Then The "Upfront" plan panel should be expanded
        And The "Installments" plan panel should be collapsed
        And The next button on step two should be enabled

    @sep14-2
    Scenario: Selecting the Installments plan highlights it and activates Next
        Then The next button on step two should be disabled by default
        When User selects installments payment plan
        Then The "Installments" plan panel should be expanded
        And The "Upfront" plan panel should be collapsed
        And The next button on step two should be enabled

    @sep14-3
    Scenario: User can change selection before proceeding
        When User selects upfront payment plan
        And User selects installments payment plan
        Then The "Installments" plan panel should be expanded
        And The "Upfront" plan panel should be collapsed
        And The next button on step two should be enabled