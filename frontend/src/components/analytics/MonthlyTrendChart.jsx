import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

export default function MonthlyTrendChart({ data }) {
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-400">
        No data yet
      </div>
    );
  }

  const chartData = data.map((item) => ({
    month: item.month,
    spent: item.totalSpent,
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis dataKey="month" tick={{ fontSize: 12 }} />
        <YAxis tick={{ fontSize: 12 }} />
        <Tooltip formatter={(value) => `₹${value.toLocaleString("en-IN")}`} />
        <Line
          type="monotone"
          dataKey="spent"
          stroke="#ff6b6b"
          strokeWidth={2}
          dot={{ fill: "#ff4d96", r: 4 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}