import { useState } from "react";


const CATEGORIES = ["food", "transport", "utilities", "entertainment", "health", "shopping", "education", "other"];
const PAYMENT_METHODS = ["cash", "upi", "card", "netbanking", "other"];

export default function ExpenseForm({ initialData, onSubmit, loading, submitLabel }) {
    const [formData, setFormData] = useState({
        amount: initialData?.amount || "",
        category: initialData?.category || "",
        description: initialData?.description || "",
        paymentMethod: initialData?.paymentMethod || "cash",
        date: initialData?.date
            ? new Date(initialData.date).toISOString().split("T")[0]
            : new Date().toISOString().split("T")[0],
    });

    function handleChange(e) {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        onSubmit(formData);
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-5">

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="amount">
                    Amount (₹)
                </label>
                <input
                    type="number"
                    name="amount"
                    id="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    placeholder="0.00"
                    required
                    min="0"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                </label>
                <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">Select a category</option>
                    {CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>
                            {cat.charAt(0).toUpperCase() + cat.slice(1)}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="desc">
                    Description
                    <span className="text-gray-400 font-normal ml-1">(optional)</span>
                </label>
                <input
                    type="text"
                    name="description"
                    id="desc"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="What was this for?"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Payment Method
                </label>
                <select
                    name="paymentMethod"
                    value={formData.paymentMethod}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    {PAYMENT_METHODS.map((method) => (
                        <option key={method} value={method}>
                            {method.charAt(0).toUpperCase() + method.slice(1)}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="date">
                    Date
                </label>
                <input
                    type="date"
                    name="date"
                    id="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition disabled:opacity-50"
            >
                {loading ? "Saving..." : submitLabel}
            </button>

        </form>
    );
}