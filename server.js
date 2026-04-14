const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// RDS CONNECTION (using env variables)
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: 3306
});

db.connect((err) => {
  if (err) {
    console.error("DB Connection Failed", err);
  } else {
    console.log("Connected to RDS");
  }
});

app.get("/contacts", (req, res) => {
  db.query("SELECT * FROM users", (err, result) => {
    res.json(result);
  });
});

app.listen(5000, () => {
  console.log("Server running on 5000");
});