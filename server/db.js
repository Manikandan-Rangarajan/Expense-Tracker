import mongoose from "mongoose";

// Client Schema
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  // Embedding Expenses Array
  expenses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Expense', // Reference to Expense model
    },
  ],
  reports: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Report', // Reference to Report model
    },
  ],
});

// Expense Schema
const expenseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client', // Reference to the Client who owns this expense
    required: true,
  },
});

// Report Schema
const reportSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  period: {
    type: String, // Example: 'Monthly', 'Yearly'
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  expenses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Expense', // Reference to related expenses
    },
  ],
  totalAmount: {
    type: Number, // Total expenses in the report
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client', // Reference to the Client who generated the report
    required: true,
  },
});

const Client = mongoose.model('Client', UserSchema);
const Expense = mongoose.model('Expense', expenseSchema);
const Report = mongoose.model('Report', reportSchema);

export { Client, Expense, Report };
