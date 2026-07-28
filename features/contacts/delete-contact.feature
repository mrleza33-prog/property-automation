@deleteContact
Feature: Delete Contact

  Scenario Outline: User can delete a contact

    Given I login as "<role>"
    When I navigate to Contacts
    And I search for contact "Auto Broker"
    And I select the first contact
    Then the contact should be selected
    When I delete the selected contact
    Then the contact should be deleted successfully

    Examples:
    | tcId        | role    |
    | E2E-05-01   | admin   |
    | E2E-05-02   | manager |