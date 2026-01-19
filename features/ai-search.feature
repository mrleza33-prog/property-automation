Feature: AI-powered document search

  Scenario: Find properties with McDonalds as tenant
    Given I perform an AI search with prompt "provide a table of all properties that list McDonalds as a tenant"
    Then the AI response should contain tenant "McDonalds"
