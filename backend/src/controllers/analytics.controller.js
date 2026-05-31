import mongoose from "mongoose";
import Expense from "../models/expense.model.js";
import asyncWrap from "../utils/asyncWrap.js";
import CustomError from "../utils/CustomError.js";


const summaryOfExpensesController = asyncWrap(async (req, res) => {
    const summary = await Expense.aggregate([
        {
            $match: {
                userId: req.user._id
            }
        },
        {
            $group: {
                _id: null,
                totalSpent: {
                    $sum: '$amount'
                },
                totalExpenses: {
                    $sum: 1
                },
                averageExpense: {
                    $round: [{ $avg: '$amount' }, 2]
                }
            }
        }
    ]);

    const data = summary[0] || {
        totalSpent: 0,
        totalExpenses: 0,
        averageExpense: 0
    };

    res.status(200).json({
        success: true,
        message: "Summary fetched successfully",
        data
    });
});

const categorySummaryController = asyncWrap(async (req, res) => {
    const categoryWiseExpense = await Expense.aggregate([
        {
            $match: { userId: req.user._id }
        },
        {
            $group: {
                _id: "$category",
                totalSpent: {
                    $sum: "$amount"
                },
                transactions: {
                    $sum: 1
                }
            }
        },
        {
            $project: {
                _id: 0,
                category: "$_id",
                totalSpent: 1,
                transactions: 1
            }
        },
        {
            $sort: {
                totalSpent: -1
            }
        }
    ]);

    res.status(200).json({
        success: true,
        message: "Category wise data fetched successfully",
        data: categoryWiseExpense
    });
});

const paymentSummaryController = asyncWrap(async (req, res) => {
    const paymentWiseSummary = await Expense.aggregate([
        {
            $match: {
                userId: req.user._id
            }
        },
        {
            $group: {
                _id: "$paymentMethod",
                totalSpent: {
                    $sum: "$amount"
                },
                transactions: {
                    $sum: 1
                }
            }
        },
        {
            $project: {
                _id: 0,
                paymentMethod: "$_id",
                totalSpent: 1,
                transactions: 1
            }
        },
        {
            $sort: {
                totalSpent: -1,
                transactions: -1
            }
        }
    ]);

    res.status(200).json({
        success: true,
        message: "Payment method wise data fetched successfully",
        data: paymentWiseSummary
    });
});

const monthlyTrendsController = asyncWrap(async (req, res) => {
    const monthlyTrends = await Expense.aggregate([
        {
            $match: {
                userId: req.user._id
            }
        },
        {
            $group: {
                _id: {
                    $dateToString: {
                        format: "%Y-%m",
                        date: "$date"
                    }
                },
                totalSpent: {
                    $sum: "$amount"
                },
                transactions: {
                    $sum: 1
                }
            }
        },
        {
            $project: {
                _id: 0,
                month: "$_id",
                totalSpent: 1,
                transactions: 1
            }
        },
        {
            $sort: {
                month: 1
            }
        }
    ]);

    res.status(200).json({
        success: true,
        message: "Monthly trends fetched successfully",
        data: monthlyTrends
    });
});


export {
    summaryOfExpensesController,
    categorySummaryController,
    paymentSummaryController,
    monthlyTrendsController
}