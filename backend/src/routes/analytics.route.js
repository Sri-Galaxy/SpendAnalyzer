import express from 'express';
import {
    summaryOfExpensesController,
    categorySummaryController,
    paymentSummaryController,
    monthlyTrendsController
} from '../controllers/analytics.controller.js';
import isAuthenticated from '../middlewares/auth.middleware.js';


const analyticsRounter = express.Router();

analyticsRounter.get('/summary', isAuthenticated, summaryOfExpensesController);
analyticsRounter.get('/category-summary', isAuthenticated, categorySummaryController);
analyticsRounter.get('/payment-summary', isAuthenticated, paymentSummaryController);
analyticsRounter.get('/monthly-summary', isAuthenticated, monthlyTrendsController);


export default analyticsRounter;