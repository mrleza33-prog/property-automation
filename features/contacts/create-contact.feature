@e2e @createContact
Feature: Create Contact → Validate → Save

  Scenario Outline: <tcId> - <role> can create a contact successfully

    Given I login as "<role>"

    When I navigate to Contacts
    And I click Add Contact
    And I complete all required contact fields
    And I submit the contact form

   
    Then the contact should be saved successfully
  

    And I logout successfully

  Examples:
    | tcId        | role    |
    | E2E-03-01   | admin   |
    | E2E-03-02   | agent   |
    | E2E-03-03   | manager |