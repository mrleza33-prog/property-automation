@e2e @propertySelection
Feature: Property Selection - Detail View

  As a system user
  I want to open the Property Detail View
  So that I can view full property information

  @admin
  Scenario: E2E-02-01 Admin can open Property Detail View
    Given I login as "admin"
    When I search for "Find Medical Offce Building properties within 300 miles of Charlotte"
    And I select the first property from the results
    Then the Property Information page should open with correct data
    And I logout successfully

  @agent
  Scenario: E2E-02-02 Agent can open Property Detail View
    Given I login as "agent"
    When I search for "351 QUARRY ROAD"
    And I select the first property from the results
    Then the Property Information page should open with correct data
    And I logout successfully

  @manager
  Scenario: E2E-02-03 Manager can open Property Detail View
    Given I login as "manager"
    When I search for "NEW HOPE CENTER"
    And I select the first property from the results
    Then the Property Information page should open with correct data
    And I logout successfully
