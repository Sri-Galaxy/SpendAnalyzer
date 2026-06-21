import mongoose from "mongoose";
import Expense from "../models/expense.model.js";
import User from "../models/user.model.js";
import asyncWrap from "../utils/asyncWrap.js";
import CustomError from "../utils/CustomError.js";


const addExpenseController = asyncWrap(async (req, res) => {
    const { amount, category, description, paymentMethod, date } = req.body;

    if (amount === undefined || amount === null) {
        throw new CustomError(400, "Amount is required");
    }

    if (amount <= 0) {
        throw new CustomError(400, "Amount must be greater than zero");
    }

    if (!category) {
        throw new CustomError(400, "Category is missing");
    }

    const expense = await Expense.create({
        userId: req.user._id,
        amount,
        category,
        description,
        paymentMethod,
        date
    });

    res.status(201).json({ success: true, message: "Expense created successfully", data: expense });
});

const getExpensesController = asyncWrap(async (req, res) => {
    const { category, startDate, endDate, paymentMethod, sort } = req.query;

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;

    const query = {
        userId: req.user._id
    }

    if (start || end) {
        query.date = {};
    }

    if (page <= 0 || limit <= 0) {
        throw new CustomError(400, "Pages and limit cannot be Negative or Zero");
    }

    if (start && end && start > end) {
        throw new CustomError(400, "start date cannot be later than end date");
    }

    if (category) {
        query.category = category.trim().toLowerCase();
    }

    if (start) {
        query.date.$gte = start;
    }

    if (end) {
        query.date.$lte = end;
    }

    if (paymentMethod) {
        query.paymentMethod = paymentMethod;
    }

    const latest = (sort === "latest") ? -1 : 1;
    const skipped = (page - 1) * limit;

    const expenses = await Expense.find(query).sort({ date: latest }).skip(skipped).limit(limit);

    const countExpenses = await Expense.countDocuments(query);
    const totalPages = Math.ceil(countExpenses / limit);

    return res.status(200).json({
        success: true,
        message: "Expenses fetched successfully",
        data: { expenses, "count": countExpenses, totalPages, page, limit }
    });
});

const getParticularExpenseController = asyncWrap(async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new CustomError(400, "Invalid expense ID");
    }

    const expense = await Expense.findOne({
        _id: id,
        userId: req.user._id
    });

    if (!expense) {
        throw new CustomError(404, "Expense Not Found");
    }

    res.status(200).json({success: true, message: "Specific expense fetched successfully", data: expense});
});

const updateExpenseController = asyncWrap(async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new CustomError(400, "Invalid expense ID");
    }

    const expense = await Expense.findOne({
        _id: id,
        userId: req.user._id
    });

    if (!expense) {
        throw new CustomError(404, "Expense not found");
    }

    const { amount, category, description, paymentMethod, date } = req.body;

    if (amount !== undefined) {
        if (amount <= 0) {
            throw new CustomError(400, "Amount must be greater than zero");
        }
        expense.amount = amount;
    }

    if (category !== undefined) {
        if (!category.trim()) {
            throw new CustomError(400, "Category cannot be empty");
        }
        expense.category = category.trim().toLowerCase();
    }

    if (description !== undefined) {
        expense.description = description.trim();
    }

    if (paymentMethod !== undefined) {
        expense.paymentMethod = paymentMethod;
    }

    if (date !== undefined) {
        const parsedDate = new Date(date);

        if (isNaN(parsedDate.getTime())) {
            throw new CustomError(400, "Invalid date format");
        }
        expense.date = parsedDate;
    }

    await expense.save();

    return res.status(200).json({
        success: true,
        message: "Expense updated successfully",
        data: expense
    });
});

const deleteExpenseController = asyncWrap(async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new CustomError(400, "Invalid expense ID");
    }

    const expense = await Expense.findOne({
        _id: id,
        userId: req.user._id
    });

    if (!expense) {
        throw new CustomError(404, "Expense not found");
    }

    await expense.deleteOne();

    return res.status(200).json({
        success: true,
        message: "Expense deleted successfully"
    });
});


export {
    addExpenseController,
    getExpensesController,
    getParticularExpenseController,
    updateExpenseController,
    deleteExpenseController
}