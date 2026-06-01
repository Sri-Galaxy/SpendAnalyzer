import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const COLORS = ["#3b82f6", "#8b5cf6", "#10b981", "#f59e0b", "#ef4444", "#06b6d4", "#ec4899", "#84cc16"];

export default function CategoryChart({ data }) {
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-400">
        No data yet
      </div>
    );
  }

  const chartData = data.map((item) => ({
    name: item.category.charAt(0).toUpperCase() + item.category.slice(1),
    value: item.totalSpent,
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          outerRadius={100}
          dataKey="value"
          label={({ name, percent }) =>
            `${name} ${(percent * 100).toFixed(0)}%`
          }
        >
          {chartData.map((_, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => `₹${value.toLocaleString("en-IN")}`} />
      </PieChart>
    </ResponsiveContainer>
  );
}