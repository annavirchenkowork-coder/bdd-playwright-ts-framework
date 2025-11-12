@sep10
Feature: Enter my Personal details

    As a customer, I should be able to enter my Personal details.

    # AC1: Default field types and values should be as follows:
    #   a. First Name: Text field is present.
    #   b. Last Name: Text field is present.
    #   c. Email Address: Text field is present and validates for email format.
    #   d. Phone: The field allows numbers only.
    # AC2: "How did you hear about us?" A standard dropdown list is present.
    # AC3: The 'Next' button should be disabled if any required data is missing or invalid.

    Background:
        Given User is on the enrollment page

    @sep10-1
    Scenario: Required personal detail fields are present
        Then The First Name field should be present and required
        And The Last Name field should be present and required
        And The Email Address field should be present and required
        And The Phone field should be present and required

    @sep10-2
    Scenario Outline: Email format validation blocks invalid values
        When I type "<email>" into the Email Address field
        Then The Email Address field validity should be <valid>
        And The form should be invalid
        And Clicking Next should keep me on Step 1

        Examples:
            | email          | valid |
            | abc            | false |
            | abc@           | false |
            | a@b.           | false |
            | user@@test.com | false |
            | user@test..com | false |
            | a@b            | true  |
            | user@test.com  | true  |

    @sep10-3
    Scenario Outline: Phone field only allows numeric input
        When I type "<value>" into the Phone field
        Then The Phone field validity should be <valid>
        And The form should be invalid
        And Clicking Next should keep me on Step 1

        Examples:
            | value      | valid |
            | abcdef     | false |
            | 123abc     | false |
            | 2025550188 | true  |

    @sep10-4
    Scenario: “How did you hear about us?” dropdown is present with standard options
        Then The "How did you hear about us?" dropdown should be present
        And The dropdown should contain at least the options:
            | Email     |
            | Facebook  |
            | Google    |
            | Instagram |
            | LinkedIN  |
            | Twitter   |
            | Other     |

    @sep10-5
    Scenario: Next button stays disabled until all required data is valid
        Then The form should be invalid
        When I enter a valid First Name and Last Name
        And I enter a valid Email Address
        And I enter a valid Phone
        And I select "LinkedIn" in the "How did you hear about us?" dropdown
        Then The form should be valid
        And Clicking Next should take me to Step 2