import express from 'express';
import isAuthenticated from '../middlewares/auth.middleware.js';
import { 
    getExpensesController,
    addExpenseController,
    getParticularExpenseController,
    updateExpenseController,
    deleteExpenseController
} from '../controllers/expense.controller.js';


const expenseRouter = express.Router();

expenseRouter.post('/', isAuthenticated, addExpenseController);
expenseRouter.get('/', isAuthenticated, getExpensesController);
expenseRouter.get('/:id', isAuthenticated, getParticularExpenseController);
expenseRouter.patch('/:id', isAuthenticated, updateExpenseController);
expenseRouter.delete('/:id', isAuthenticated, deleteExpenseController);


export default expenseRouter;