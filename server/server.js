import express from "express";
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import session from "express-session";
import bodyParser from 'body-parser';
import mongoose from "mongoose";
import Client from './db.js';
import bcrypt from 'bcryptjs';

const app = express();
app.use(express.json());

app.use(bodyParser.json());
app.use(cors({
    origin: 'http://localhost:3000', // Replace with your frontend's origin
    methods: ['GET', 'POST'],
    credentials: true
  }));

// MongoDB Connection
mongoose.connect("mongodb://localhost:27017/expense")
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use(express.static(path.join(path.resolve(), '../Client/dist')));

app.post('/signup', async (req, res) => {
    const { name, email, pwd } = req.body;

    try {
        // Check if the email is already in use
        const existingUser = await Client.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ error: 'Email is already in use' });
        }

        const hashedpassword = await bcrypt.hash(pwd,10)

        // Create a new user if the email is unique
        const newUser = new Client({ name, email, password:hashedpassword, realpassword:pwd });
        await newUser.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error('Error during sign-up:', error);
        res.status(500).json({ error: 'User creation failed due to server error' });
    }
});


app.post("/signin", async (req, res) => {
  const { user, pwd } = req.body;
  try {
    const existingUser = await Client.findOne({ user });
    
    if (existingUser) {
      const isPasswordValid = await bcrypt.compare(pwd, existingUser.password);
      
      if (isPasswordValid) {
        res.status(200).json({ message: "Sign-in successful" });
      } else {
        // If the password is invalid, send a 401 Unauthorized response
        res.status(401).json({ message: "Invalid password" });
      }
    } else {
      // Send 400 if the user doesn't exist
      res.status(400).json({ message: "User does not exist" });
    }
  } catch (e) {
    console.error("Error during sign-in:", e);
    res.status(500).json({ message: "Internal Server Error", error: e.message });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(path.resolve(), '../Client/dist', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
