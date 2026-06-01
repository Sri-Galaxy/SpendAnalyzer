export function formatCurrency(amount) {
  return `₹${Number(amount).toLocaleString("en-IN")}`;
}

export function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}