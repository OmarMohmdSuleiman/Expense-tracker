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
  
  app.get("/test-db", async (req, res) => {
    try {
      // Query the 'history' table
      const result = await db.query("SELECT * FROM history");
  
      if (result.rows.length === 0) {
        // No records found in the 'history' table
        return res.status(404).send("No data found in the history table.");
      }
  
      // Send the rows as a JSON response if data exists
      return res.status(200).json(result.rows);
    } catch (err) {
      // Log error and send a detailed response if something goes wrong
      console.error("Error fetching data from the database:", err);
      return res.status(500).send(`Error fetching data: ${err.message}`);
    }
  });

// Start the Express server on port 4000
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});