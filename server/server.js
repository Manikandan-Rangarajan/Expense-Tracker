import express from "express";
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import mongoose from "mongoose";
import { Client, Expense } from './db.js';
import bcrypt from 'bcrypt';

const app = express();
app.use(express.json());

app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:5000',
  methods: ['GET', 'POST'],
  credentials: true,
}));

// MongoDB Connection
mongoose.connect("mongodb://localhost:27017/expense")
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use(express.static(path.join(path.resolve(), '../Client/dist')));

// Function to add an expense for a specific user
async function addExpenseToUser(userId, expenseData) {
  try {
    const newExpense = new Expense(expenseData);
    await newExpense.save();

    const user = await Client.findById(userId);
    user.expenses.push(newExpense._id);
    await user.save();

    console.log('Expense added to user:', user);
  } catch (error) {
    console.error('Error adding expense:', error);
  }
}

async function getUserWithExpenses(userId) {
  try {
    const user = await Client.findById(userId).populate('expenses');
    console.log('User with expenses:', user);
  } catch (error) {
    console.error('Error fetching user with expenses:', error);
  }
}

// Sign-Up Route
app.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await Client.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ error: 'Email is already in use' });
    }

    // Hash the password before saving the user
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new Client({ name, email, password: hashedPassword });
    await newUser.save();
    
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error during sign-up:', error);
    res.status(500).json({ error: 'User creation failed due to server error' });
  }
});

// Sign-In Route
app.post("/signin", async (req, res) => {
  const { name, password } = req.body;
  
  try {
    const existingUser = await Client.findOne({ name });

    if (!existingUser) {
      return res.status(400).json({ message: "User does not exist" });
    }

    // Compare the hashed password
    const isPasswordValid = await bcrypt.compare(password, existingUser.password);
    
    if (isPasswordValid) {
      return res.status(409).json({ message: "User exists" });
    } else {
      return res.status(401).json({ message: "Invalid password" });
    }
  } catch (e) {
    console.error("Error during sign-in:", e);
    res.status(500).json({ message: "Internal Server Error", error: e.message });
  }
});

// Add Expense Route
app.post('/expenses', async (req, res) => {
  const { userId, name, amount, date, category } = req.body;

  try {
    const expenseData = { name, amount, date, category };
    await addExpenseToUser(userId, expenseData);
    
    res.status(200).json({ message: 'Expense added successfully' });
  } catch (error) {
    console.error('Error adding expense:', error);
    res.status(500).json({ error: 'Failed to add expense' });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(path.resolve(), '../Client/dist', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
