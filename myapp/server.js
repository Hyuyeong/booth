import express from "express";
import mysql from "mysql2";
import cors from "cors";
import 'dotenv/config';

const app = express();
app.use(cors({
    origin: "http://localhost:5173",  // your React app URL
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],  // Include OPTIONS
    allowedHeaders: ["Content-Type", "Authorization"],  // Allow headers
    credentials: true                 // If you're using cookies for auth
}));

app.use(express.json());

const apiUrl = process.env.REACT_APP_API_URL;
const user = process.env.REACT_APP_USER;
const password = process.env.REACT_PASSWORD;
const database = process.env.REACT_APP_DATABASE;

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
  });

// const db = mysql.createConnection({
//   host: apiUrl,
//   user: user,
//   password: password,
//   database: database
// });




app.get("/api/data", (req, res) => {
    db.query("SELECT * FROM WaterConsumptions", (err, results) => {
      if (err) {
        console.error("DB Error:", err);
        return res.status(500).json({ error: err.message });
      }
      console.log("DB Data:", results);  // 👉 서버에 데이터 출력 확인!
      res.json(results);
    });
  });
  
app.listen(3001, "0.0.0.0", () => {
console.log("Server running on port 3001");
});

