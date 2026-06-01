import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import SummaryCards from "../components/analytics/SummaryCards";
import CategoryChart from "../components/analytics/CategoryChart";
import { getSummary, getCategorySummary } from "../api/analytics.api";


export default function DashboardPage() {
  const [summary, setSummary] = useState(null);
  const [categoryData, setCategoryData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [summaryRes, categoryRes] = await Promise.all([
          getSummary(),
          getCategorySummary(),
        ]);
        setSummary(summaryRes.data);
        setCategoryData(categoryRes.data);
      } catch (error) {
        toast.error("Failed to load dashboard");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1">Your spending at a glance</p>
        </div>
        <Link
          to="/expenses/add"
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition"
        >
          + Add Expense
        </Link>
      </div>

      <SummaryCards summary={summary} />

      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Spending by Category
        </h2>
        <CategoryChart data={categoryData} />
      </div>

    </div>
  );
}