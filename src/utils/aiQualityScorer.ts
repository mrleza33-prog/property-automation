export class AIQualityScorer {
  static score(response: any, expectedTenant: string) {
    let score = 0;
    const issues: string[] = [];

    if (!response) {
      return { score: 0, issues: ["Empty AI response"] };
    }

    // Case 1: Structured JSON
    if (Array.isArray(response.result)) {
      score += 30;

      if (response.result.length === 0) {
        issues.push("No rows returned");
      } else {
        score += 30;

        const invalidRows = response.result.filter(
          (row: any) =>
            !row.tenant ||
            !row.tenant.toLowerCase().includes(expectedTenant.toLowerCase())
        );

        if (invalidRows.length === 0) {
          score += 40;
        } else {
          issues.push("Some rows do not contain expected tenant");
        }
      }
    }

    // Case 2: Markdown / Text Table
    if (typeof response.answer === "string") {
      score += 20;

      if (response.answer.includes("|")) {
        score += 30;
      } else {
        issues.push("No table detected");
      }

      if (response.answer.toLowerCase().includes(expectedTenant.toLowerCase())) {
        score += 50;
      } else {
        issues.push("Expected tenant not found in table");
      }
    }

    return { score, issues };
  }
}
