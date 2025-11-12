@sep11
Feature: Program start dates and refund dates

    As a customer, I want to see the program start date and refund policy
    so I can make an informed decision before enrolling.

    # AC1: Start date and refund date are visible on Step 1 for "Test Automation with Selenium".
    # AC2: Dates shown on the page match the expected values from test data.

    Background:
        Given User is on the enrollment page

    @sep11-1
    Scenario: Start date and refund date are displayed on Step 1
        Then The Program Start Date is visible
        And The Refund End Date is visible

    @sep11-2
    Scenario: Start date and refund date values are correct
        Then The Program Start Date matches the expected value
        And The Refund End Date matches the expected value