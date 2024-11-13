import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import env from "dotenv";
import { Pool } from 'pg'; 

const app = express(); //Initialize the express app
const port = 4000; // Port of the server

env.config(); // Load the variables from .env

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public")); // Look inside the public folder

const pool = new Pool({
    user: process.env.PG_USER,        
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT
  });

app.get('/', (req, res) => {
    res.status(200).send('Hello World!');
  })

// Start the Express server on port 4000
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});