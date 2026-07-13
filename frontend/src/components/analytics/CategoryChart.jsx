import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";


const COLORS = [
  "#f59e0b",
  "#f97316",
  "#ef4444",
  "#fb923c",
  "#facc15",
  "#eab308",
  "#dc2626",
  "#f43f5e",
];

export default function CategoryChart({ data }) {
  if (!data || data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-gray-400">
        <img src="/load.png" alt="no data found" />
        <p>No data seems! I am sleeping...</p>
      </div>
    );
  }

  const chartData = data.map((item) => ({
    name: item.category.charAt(0).toUpperCase() + item.category.slice(1),
    value: item.totalSpent,
  }));

  return (
    <ResponsiveContainer width="100%" height={360}>
      <PieChart>
        <Pie
          data={chartData}
          cx="50%"
          cy="40%"
          innerRadius={60}
          outerRadius={100}
          paddingAngle={2}
          dataKey="value"
          label={({ percent }) => percent >= 0.04 ? `${(percent * 100).toFixed(0)}%` : ""}
          labelLine={{ stroke: "#cbd5e1", strokeWidth: 1 }}
        >
          {chartData.map((_, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          formatter={(value) => `₹${value.toLocaleString("en-IN")}`}
          contentStyle={{
            backgroundColor: "#f8fafc",
            border: "1px solid #e2e8f0",
            borderRadius: "8px"
          }}
        />
        <Legend
          verticalAlign="bottom"
          height={36}
          wrapperStyle={{
            paddingTop: "10px"
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}