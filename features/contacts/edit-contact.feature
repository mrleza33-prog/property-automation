@e2e @editContact
Feature: Edit Contact → Update → Save

Scenario Outline: <tcId> - <role> can edit an existing contact

    Given I login as "<role>"
    And I navigate to Contacts
    When I search for contact "Auto Broker"
    And I open the first contact in the results
    And I click Update
    And I change the first name to "Auto Broker Updated"
    And I save the contact
    Then the contact should be updated successfully
    And I logout successfully

  Examples:
    | tcId        | role    |
    | E2E-04-01   | admin   |
    | E2E-04-02   | agent   |
    | E2E-04-03   | manager |