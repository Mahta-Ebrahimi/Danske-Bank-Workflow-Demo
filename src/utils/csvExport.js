export function exportTasksToCSV(tasks) {
  const headers = ["id", "title", "status", "category", "priority"];
  const rows = tasks.map(t => [t.id, t.title, t.status, t.category, t.priority]);
  const csv = [headers.join(","), ...rows.map(r => r.join(","))].join("\n");

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "tasks.csv";
  link.click();
}
