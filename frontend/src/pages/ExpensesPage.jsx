import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { getExpenses, deleteExpense } from "../api/expense.api";
import { formatCurrency, formatDate } from "../utils/format";


const CATEGORIES = ["food", "transport", "utilities", "entertainment", "health", "shopping", "education", "other"];
const PAYMENT_METHODS = ["cash", "upi", "card", "netbanking", "other"];

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: "",
    paymentMethod: "",
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    fetchExpenses();
  }, []);

  async function fetchExpenses(currentFilters = filters) {
    setLoading(true);
    try {
      const activeFilters = Object.fromEntries(
        Object.entries(currentFilters).filter(([_, v]) => v !== "")
      );
      const result = await getExpenses(activeFilters);
      setExpenses(result.data.expenses);
      setPagination({
        count: result.data.count,
        totalPages: result.data.totalPages,
        page: result.data.page,
        limit: result.data.limit,
      });
    } catch (error) {
      toast.error("Failed to load expenses");
    } finally {
      setLoading(false);
    }
  }

  function handleFilterChange(e) {
    setFilters((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleApplyFilters() {
    fetchExpenses();
  }

  function handleClearFilters() {
    const cleared = { category: "", paymentMethod: "", startDate: "", endDate: "" };
    setFilters(cleared);
    fetchExpenses(cleared);
  }

  async function handleDelete(id) {
    if (!window.confirm("Are you sure you want to delete this expense?")) return;
    try {
      const result = await deleteExpense(id);
      toast.success(result.message);
      setExpenses((prev) => prev.filter((e) => e._id !== id));
    } catch (error) {
      toast.error("Failed to delete expense");
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Expenses</h1>
          <p className="text-gray-500 text-sm mt-1">
            <p>{pagination?.count ?? expenses.length} expense{(pagination?.count ?? expenses.length) !== 1 ? "s" : ""} found</p>          </p>
        </div>
        <Link
          to="/expenses/add"
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition"
        >
          + Add Expense
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-4 mb-6">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <select
            name="category"
            value={filters.category}
            onChange={handleFilterChange}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Categories</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>

          <select
            name="paymentMethod"
            value={filters.paymentMethod}
            onChange={handleFilterChange}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Methods</option>
            {PAYMENT_METHODS.map((method) => (
              <option key={method} value={method}>
                {method.charAt(0).toUpperCase() + method.slice(1)}
              </option>
            ))}
          </select>

          <input
            type="date"
            name="startDate"
            value={filters.startDate}
            onChange={handleFilterChange}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="date"
            name="endDate"
            value={filters.endDate}
            onChange={handleFilterChange}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex gap-2 mt-3">
          <button
            onClick={handleApplyFilters}
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition"
          >
            Apply Filters
          </button>
          <button
            onClick={handleClearFilters}
            className="bg-gray-100 hover:bg-gray-200 text-gray-600 text-sm font-medium px-4 py-2 rounded-lg transition"
          >
            Clear
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-48">
          <p className="text-gray-500">Loading expenses...</p>
        </div>
      ) : expenses.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-48 bg-white rounded-2xl shadow-sm">
          <p className="text-gray-500 text-lg">No expenses found</p>
          <Link to="/expenses/add" className="text-blue-600 text-sm mt-2 hover:underline">
            Add your first expense
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {expenses.map((expense) => (
            <div
              key={expense._id}
              className="bg-white rounded-2xl shadow-sm p-4 flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-lg">
                  💸
                </div>
                <div>
                  <p className="font-semibold text-gray-800">
                    {expense.description || expense.category}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {expense.category} · {expense.paymentMethod} · {formatDate(expense.date)}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="font-bold text-gray-800">
                  {formatCurrency(expense.amount)}
                </span>
                <Link
                  to={`/expenses/${expense._id}/edit`}
                  className="text-sm text-blue-600 hover:underline"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(expense._id)}
                  className="text-sm text-red-500 hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}