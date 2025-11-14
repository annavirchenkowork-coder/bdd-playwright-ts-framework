@sep19
Feature: Proceed to Step 2 after completing Step 1

    As a customer enrolling through the portal,
    I should be able to move to Step 2 after providing valid personal information in Step 1,
    so that I can continue the enrollment process.

    # Acceptance Criteria:
    # AC1: The system should allow the user to proceed to Step 2 when valid information is provided.
    #   a. Validate with all fields completed (required + optional)
    #   b. Validate with only required fields completed

    Background:
        Given User is on the enrollment page

    @sep19-1
    Scenario: Proceed to Step 2 with all fields completed
        When User enters valid information in all required and optional fields
        And User clicks the Next button on Step 1
        Then Step 1 stepper indicator should display as completed green
        And Step 2 stepper indicator should be active blue

    @sep19-2
    Scenario: Proceed to Step 2 with only required fields completed
        When User enters valid information in only the required fields
        And User clicks the Next button on Step 1
        Then Step 1 stepper indicator should display as completed green
        And Step 2 stepper indicator should be active blue