export function generateSuggestion(title, category, priority, deadline) {
  const lowerTitle = title.toLowerCase();
  let steps = [];

  // Finance workflows
  if (category === "Finance") {
    if (lowerTitle.includes("loan")) {
      steps = [
        "Collect applicant documents",
        "Run credit check",
        "Risk assessment",
        "Approval meeting",
        "Finalize contract",
      ];
    } else if (lowerTitle.includes("report")) {
      steps = [
        "Gather financial data",
        "Analyze KPIs",
        "Draft report",
        "Peer review",
        "Publish to stakeholders",
      ];
    } else {
      steps = ["Budget planning", "Review", "Approval"];
    }
  }

  // HR workflows
  else if (category === "HR") {
    if (lowerTitle.includes("onboarding")) {
      steps = [
        "Prepare contract",
        "Orientation session",
        "Assign mentor",
        "Training schedule",
        "Feedback collection",
      ];
    } else if (lowerTitle.includes("recruitment")) {
      steps = [
        "Post job ad",
        "Screen CVs",
        "Conduct interviews",
        "Select candidate",
        "Offer letter",
      ];
    } else {
      steps = ["HR planning", "Execution", "Evaluation"];
    }
  }

  // IT workflows
  else if (category === "IT") {
    if (lowerTitle.includes("upgrade")) {
      steps = [
        "Backup system",
        "Install update",
        "Run tests",
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
      steps = ["Plan sprint", "Develop feature", "Deploy"];
    }
  }

  // Priority adjustments
  if (priority === "High") {
    steps.unshift("⚡ Urgent review");
  } else if (priority === "Low") {
    steps.push("Optional follow-up");
  }

  // Deadline awareness
  if (deadline) {
    steps.push(`📅 Ensure completion before ${deadline}`);
  }

  return steps; // return array instead of string
}
