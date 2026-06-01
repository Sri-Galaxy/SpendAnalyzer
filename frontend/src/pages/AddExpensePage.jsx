import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import ExpenseForm from "../components/expenses/ExpenseForm";
import { addExpense } from "../api/expense.api";


export default function AddExpensePage() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    async function handleSubmit(formData) {
        setLoading(true);
        try {
            const result = await addExpense(formData);
            toast.success(result.message);
            navigate("/expenses");
        } catch (error) {
            const message = error.response?.data?.message || "Something went wrong";
            toast.error(message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="max-w-lg mx-auto">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Add Expense</h1>
                <p className="text-gray-500 text-sm mt-1">Record a new expense</p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-6">
                <ExpenseForm
                    onSubmit={handleSubmit}
                    loading={loading}
                    submitLabel="Add Expense"
                />
            </div>
        </div>
    );
}