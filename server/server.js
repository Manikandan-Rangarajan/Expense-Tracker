import express from "express";
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import mongoose from "mongoose";
import { Client, Expense, Report } from './db.js';
import bcrypt from 'bcrypt';
import { userInfo } from "os";

const app = express();
app.use(express.json());

app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:5000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
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

// Get Expenses for a User
// Get Expenses for a User by Username
app.get('/expenses/:username', async (req, res) => {
  const { username } = req.params;

  try {
    const user = await Client.findOne({ username }).populate('expenses'); // Use username to find user
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user.expenses); // Return the expenses array
  } catch (error) {
    console.error('Error fetching expenses:', error);
    res.status(500).json({ error: 'Failed to fetch expenses' });
  }
});



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
      return res.status(409).json({ message: "User exists" ,existingUser});
    } else {
      return res.status(401).json({ message: "Invalid password" });
    }
  } catch (e) {
    console.error("Error during sign-in:", e);
    res.status(500).json({ message: "Internal Server Error", error: e.message });
  }
});

//adding-expense
app.post('/add-expense', async (req, res) => {
  const { name, amount, date, category, clientId } = req.body; // Include clientId in the request

  const expense = new Expense({
    name,
    amount,
    date,
    category,
    client: clientId, // Ensure you assign the client ID here
  });

  try {
    await expense.save();
    // Optionally push the expense into the client's expenses array here
    res.status(201).json(expense);
  } catch (error) {
    console.error('Error adding expense:', error);
    res.status(400).json({ error: 'Failed to add expense' });
  }
});


app.get('*', (req, res) => {
  res.sendFile(path.join(path.resolve(), '../Client/dist', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
