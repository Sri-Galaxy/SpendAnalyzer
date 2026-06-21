import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";


const COLORS = [
  "#06b6d4", // teal
  "#7c3aed", // purple
  "#06d6a0", // mint
  "#ff6b6b", // coral
  "#ffb86b", // warm amber
  "#4f46e5", // indigo
  "#ff4d96", // pink
  "#2dd4bf", // aqua
];

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