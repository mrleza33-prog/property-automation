@e2e @userAccess
Feature: User menu access by role

  As an application user
  I want to verify the Users menu appears only for Admin
  So that Managers and Agents do not see Users

  Scenario Outline: <role> sees the correct Users menu access
    Given I login as "<role>"
    When I check the Users menu access
    Then the Users list access should be correct for "<role>"
    And I logout successfully

  Examples:
    | role    |
    | admin   |
    | manager |
    | agent   |
