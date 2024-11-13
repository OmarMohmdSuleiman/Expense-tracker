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

app.get('/', (req, res) => {
    res.status(200).send('Hello World!');
  })

// Start the Express server on port 4000
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});