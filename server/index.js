import express from "express";
import pg from "pg";
import env from "dotenv";
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import cors from 'cors';

// Get the directory name of the current file using import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from the .env file located outside the server directory
env.config({ path: resolve(__dirname, '../.env') });

const app = express(); // Initialize the express app
const port = 4000; // Port of the server
app.use(cors());
// Middleware for parsing JSON bodies
app.use(express.json()); // This is important for handling JSON in the request body

// PostgreSQL client setup
const db = new pg.Client({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});
db.connect();

// Routes
app.get('/', (req, res) => {
  res.status(200).send('Hello World!');
});
app.get("/transactions", async (req, res) => {
    try {
      const query = "SELECT * FROM history";
      const result = await db.query(query);
  
      // Ensure amounts are numbers
      const transactions = result.rows.map(transaction => ({
        ...transaction,
        amount: parseFloat(transaction.amount), // Convert amount to a number
      }));
  
      res.status(200).json(transactions);  // Return transactions to the frontend
    } catch (err) {
      console.error("Error fetching transactions:", err);
      res.status(500).send("Error fetching transactions.");
    }
  });
  app.post("/add", async (req, res) => {
    const { text, amount } = req.body;
  
    if (!text || !amount) {
      return res.status(400).send("Transaction name and amount are required.");
    }
  
    try {
      const query = "INSERT INTO history (transaction_name, amount) VALUES ($1, $2) RETURNING *";
      const values = [text, amount];
  
      const result = await db.query(query, values);
      const newTransaction = result.rows[0];  // This should have the 'id'
  
      console.log("Transaction added:", newTransaction);
  
      // Send back the transaction with the id
      res.status(201).json(newTransaction);
    } catch (err) {
      console.error("Error adding transaction:", err);
      res.status(500).send("Error adding transaction.");
    }
  });
  app.delete("/delete/:id", async (req, res) => {
    const { id } = req.params;
    console.log("Deleting transaction with id:", id); // Ensure this is the correct id
  
    try {
      const result = await db.query("DELETE FROM history WHERE id = $1", [id]);
  
      if (result.rowCount > 0) {
        res.status(200).send(`Transaction with id ${id} deleted.`);
      } else {
        res.status(404).send("Transaction not found.");
      }
    } catch (err) {
      console.error("Error deleting transaction:", err);
      res.status(500).send("Error deleting transaction.");
    }
  });
// Start the Express server on port 4000
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});