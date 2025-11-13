@sep07
Feature: View Product Landing Page

    As a customer, I should be able to see the product landing page.

    # AC1: Show "Cydeo Secure checkout"
    # AC2: Show the program name
    # AC3: Left footer shows (in order): logo, Terms and Conditions, Privacy Policy, Disclaimer, Cookie Policy
    # AC4: Right footer shows "Need help? Contact us at enrollment@cydeo.com"

    Background:
        Given User is on the enrollment page

    @sep07-1
    Scenario: Secure checkout title is visible on the left panel
        Then The "Cydeo Secure checkout" title should be visible on the left panel

    @sep07-2
    Scenario: Program name is displayed
        Then The Program name should be visible on the left panel
        And The Program name should match the expected value

    @sep07-3
    Scenario: Left footer contains items in the correct order
        Then The left footer should contain the items in order:
            | CYDEO logo           |
            | Terms and conditions |
            | Privacy Policy       |
            | Disclaimer           |
            | Cookie Policy        |

    @sep07-4
    Scenario: Right footer shows help contact line
        Then The right footer help text should be visible
        And The help text should contain "Need help? Contact us at enrollment@cydeo.com"