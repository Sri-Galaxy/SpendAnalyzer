import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import SummaryCards from "../components/analytics/SummaryCards";
import CategoryChart from "../components/analytics/CategoryChart";
import PaymentChart from "../components/analytics/PaymentChart";
import MonthlyTrendChart from "../components/analytics/MonthlyTrendChart";
import { getSummary, getCategorySummary, getPaymentSummary, getMonthlyTrends } from "../api/analytics.api";


export default function AnalyticsPage() {
  const [summary, setSummary] = useState(null);
  const [categoryData, setCategoryData] = useState([]);
  const [paymentData, setPaymentData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [summaryRes, categoryRes, paymentRes, monthlyRes] = await Promise.all([
          getSummary(),
          getCategorySummary(),
          getPaymentSummary(),
          getMonthlyTrends(),
        ]);
        setSummary(summaryRes.data);
        setCategoryData(categoryRes.data);
        setPaymentData(paymentRes.data);
        setMonthlyData(monthlyRes.data);
      } catch (error) {
        toast.error("Failed to load analytics");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Loading analytics...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Analytics</h1>
        <p className="text-gray-500 text-sm mt-1">Deep dive into your spending</p>
      </div>

      <SummaryCards summary={summary} />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Spending by Category
          </h2>
          <CategoryChart data={categoryData} />
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Spending by Payment Method
          </h2>
          <PaymentChart data={paymentData} />
        </div>

      </div>

      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Monthly Spending Trend
        </h2>
        <MonthlyTrendChart data={monthlyData} />
      </div>

    </div>
  );
}