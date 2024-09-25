import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type:String
        // required: true,
        // unique: true
    },
    password:{
        type: String,
        required: true,
    },
    // realpassword:{
    //     type: String,
    //     required: true,
    // }
     // Embedding Expenses Array
  expenses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Expense', // Reference to Expense model
    }]
})

const expenseSchema = new mongoose.Schema({
    name: String,
    amount: Number,
    date: String,
    category: String,
  });

const Client = mongoose.model('Client',UserSchema);
const Expense = mongoose.model('Expense',expenseSchema);

export { Client, Expense };