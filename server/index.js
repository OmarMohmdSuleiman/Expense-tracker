import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import env from "dotenv";
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

// Get the directory name of the current file using import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from the .env file located outside the server directory
env.config({ path: resolve(__dirname, '../.env') });


const app = express(); //Initialize the express app
const port = 4000; // Port of the server


app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public")); // Look inside the public folder


const db = new pg.Client({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
  });
  db.connect();

app.get('/', (req, res) => {
    res.status(200).send('Hello World!');
  });
  
app.post("/add",async (req,res)=>{
    const {text,amount}=req.body;
    if (!text || !amount) {
        return res.status(400).send("Transaction name and amount are required.");
      }
    
      try {
        const query = "INSERT INTO history (transaction_name, amount) VALUES ($1, $2) RETURNING *";
        const values = [text, amount];
        
        const result = await db.query(query, values);
        const newTransaction = result.rows[0];
    
        console.log("Transaction added:", newTransaction);
        res.status(201).json(newTransaction); // Respond with the added transaction data
      } catch (err) {
        console.error("Error adding transaction to the database:", err);
        res.status(500).send("Error adding transaction.");
      }
    });

// Start the Express server on port 4000
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});