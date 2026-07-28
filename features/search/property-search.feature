@e2e @search
Feature: Property Search

  As a system user
  I want to search for properties
  So that I can find relevant property information

  @admin
  Scenario: Admin can search for properties
    Given I login as "admin"
    When I search for "129 West Trade"
    Then I should see property results
    And I logout successfully

  @manager
  Scenario: Manager can search for properties
    Given I login as "manager"
    When I search for "GATEWAY VILLAGE SHOPPING CENTER"
    Then I should see property results
    And I logout successfully

  @agent
  Scenario: Agent can search for properties
    Given I login as "agent"
    When I search for "PINNACLE STORAGE AIR STATION"
    Then I should see property results
    And I logout successfully
