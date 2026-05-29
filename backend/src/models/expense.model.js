import mongoose from 'mongoose';


const expenseSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User ID is required']
    },
    amount: {
        type: Number,
        required: [true, 'Amount is required'],
        min: [0.01, 'Amount must be greater than zero'],
    },
    category: {
        type: String,
        required: [true, 'Category is required'],
        trim: true,
        lowercase: true,
    },
    description: {
        type: String,
        trim: true,
        maxlength: [200, 'Description is too long'],
        default: ''
    },
    paymentMethod: {
        type: String,
        enum: ['cash', 'upi', 'card', 'netbanking', 'other'],
        default: 'upi'
    },
    date: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

expenseSchema.index({
    userId: 1,
    date: -1
});

const Expense = mongoose.model('Expense', expenseSchema);


export default Expense;