import express from 'express';
import isAuthenticated from '../middlewares/auth.middleware.js';
import { 
    getExpensesController,
    addExpenseController,
    getParticularExpenseController,
} from '../controllers/expense.controller.js';


const expenseRouter = express.Router();

expenseRouter.post('/', isAuthenticated, addExpenseController);
expenseRouter.get('/', isAuthenticated, getExpensesController);
expenseRouter.get('/:id', isAuthenticated, getParticularExpenseController);


export default expenseRouter;