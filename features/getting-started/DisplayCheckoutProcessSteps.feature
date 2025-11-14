@sep08
Feature: Display the steps of the checkout process

    As a customer, I should be able to know where I am in the checkout process using the stepper.

    # AC1: steps are "Start Application", "Payment Plan", "Review"
    # AC2: "Start Application" highlighted in blue
    # AC3: "Payment Plan" and "Review" shown as grey (inactive)

    Background:
        Given User is on the enrollment page

    @sep08-1
    Scenario: Stepper displays all steps in the correct order
        Then The checkout stepper should display the following steps in order:
            | 1 | Start Application |
            | 2 | Payment Plan      |
            | 3 | Review            |

    @sep08-2
    Scenario: Step 1 is highlighted as active and others shown as inactive
        Then The "Start Application" step should be active and blue
        And The following steps should be inactive and grey:
            | Payment Plan |
            | Review       |