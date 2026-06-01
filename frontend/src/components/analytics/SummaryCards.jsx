export default function SummaryCards({ summary }) {
  const cards = [
    {
      label: "Total Spent",
      value: `₹${summary?.totalSpent?.toLocaleString("en-IN") ?? 0}`,
      icon: "💰",
      color: "bg-blue-50 text-blue-600",
    },
    {
      label: "Total Expenses",
      value: summary?.totalExpenses ?? 0,
      icon: "🧾",
      color: "bg-purple-50 text-purple-600",
    },
    {
      label: "Average Expense",
      value: `₹${summary?.averageExpense?.toFixed(2) ?? 0}`,
      icon: "📊",
      color: "bg-green-50 text-green-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {cards.map((card) => (
        <div key={card.label} className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">{card.label}</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">{card.value}</p>
            </div>
            <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl ${card.color}`}>
              {card.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}