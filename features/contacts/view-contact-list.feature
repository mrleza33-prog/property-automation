@e2e @contactsList
Feature: Contact List Visibility

  As a system user
  I want to open the Contacts page
  So that I can verify the contact list is visible

  Scenario: Admin can view the contact list
    Given I login as "<role>"
    When I navigate to Contacts
    Then I should see a contacts list
    And I logout successfully

    Examples:
    | tcId        | role    |
    | E2E-06-01   | admin   |
    | E2E-06-02   | agent   |
    | E2E-06-03   | manager |
