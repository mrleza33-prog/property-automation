Feature: E2E-01 Login → Property Search → Logout

  Scenario: Admin can login, search property and logout
  Given I login as admin
  When I search for a property
  Then I should see property results
  And I logout successfully
