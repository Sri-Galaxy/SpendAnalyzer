import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import ExpenseForm from "../components/expenses/ExpenseForm";
import { getExpenseById, updateExpense } from "../api/expense.api";


export default function EditExpensePage() {
    const [expense, setExpense] = useState(null);
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);

    const navigate = useNavigate();

    const { id } = useParams();

    useEffect(() => {
        async function fetchExpense() {
            try {
                const result = await getExpenseById(id);
                setExpense(result.data);
            } catch (error) {
                toast.error("Expense not found");
                navigate("/expenses");
            } finally {
                setFetching(false);
            }
        }
        fetchExpense();
    }, [id]);

    async function handleSubmit(formData) {
        setLoading(true);
        try {
            const result = await updateExpense(id, formData);
            toast.success(result.message);
            navigate("/expenses");
        } catch (error) {
            const message = error.response?.data?.message || "Something went wrong";
            toast.error(message);
        } finally {
            setLoading(false);
        }
    }

    if (fetching) {
        return (
            <div className="flex items-center justify-center h-64">
                <p className="text-gray-500">Loading expense...</p>
            </div>
        );
    }

    return (
        <div className="max-w-lg mx-auto">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Edit Expense</h1>
                <p className="text-gray-500 text-sm mt-1">Update the details below</p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-6">
                <ExpenseForm
                    initialData={expense}
                    onSubmit={handleSubmit}
                    loading={loading}
                    submitLabel="Update Expense"
                />
            </div>
        </div>
    );
}