// utils/aiSuggestions.js

export function generateSuggestion(title, category, priority, deadline) {
  const lowerTitle = title?.toLowerCase() || "";
  let steps = [];

  switch (category) {
    // Finance workflows
    case "Finance":
      if (lowerTitle.includes("loan")) {
        steps = [
          "Collect applicant documents",
          "Run credit check",
          "Perform risk assessment",
          "Hold approval meeting",
          "Finalize contract",
        ];
      } else if (lowerTitle.includes("report")) {
        steps = [
          "Gather financial data",
          "Analyze KPIs",
          "Draft report",
          "Conduct peer review",
          "Publish to stakeholders",
        ];
      } else {
        steps = ["Budget planning", "Review financials", "Approval process"];
      }
      break;

    // HR workflows
    case "HR":
      if (lowerTitle.includes("onboarding")) {
        steps = [
          "Prepare employment contract",
          "Schedule orientation session",
          "Assign mentor",
          "Set up training schedule",
          "Collect feedback",
        ];
      } else if (lowerTitle.includes("recruitment")) {
        steps = [
          "Post job advertisement",
          "Screen CVs",
          "Conduct interviews",
          "Select candidate",
          "Issue offer letter",
        ];
      } else {
        steps = ["HR planning", "Execute HR process", "Evaluate outcomes"];
      }
      break;

    // IT workflows
    case "IT":
      if (lowerTitle.includes("upgrade")) {
        steps = [
          "Backup system",
          "Install update",
          "Run system tests",
          "Deploy to production",
          "Monitor performance",
        ];
      } else if (lowerTitle.includes("security")) {
        steps = [
          "Run vulnerability scan",
          "Analyze risks",
          "Patch issues",
          "Audit compliance",
          "Report findings",
        ];
      } else {
        steps = ["Plan sprint", "Develop feature", "Deploy release"];
      }
      break;

    // Default workflow
    default:
      steps = ["Define objectives", "Assign responsibility", "Track progress", "Complete task"];
      break;
  }

  // Priority adjustments
  if (priority === "High") {
    steps.unshift("⚡ Urgent review required");
  } else if (priority === "Low") {
    steps.push("Optional follow-up if time permits");
  }

  // Deadline awareness
  if (deadline) {
    steps.push(`📅 Ensure completion before ${deadline}`);
  }

  return steps;
}
