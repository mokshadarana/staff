const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

// Create Express app
const app = express();

// Enable CORS middleware
app.use(cors());

// Create MySQL connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: '',
    database: 'nmc'
});

// Connect to the database
db.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('Connected to the database');
});

// Middleware to parse JSON bodies
app.use(express.json());

// Handle login request
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const sql = "SELECT * FROM student WHERE email = ? AND password = ?";
    db.query(sql, [email, password], (err, results) => {
        if (err) {
            console.error('Error querying database:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }

        if (results.length === 0) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        return res.status(200).json({ message: 'Login successful', user: results[0] });
    });
});


app.listen(8081, () => {
    console.log("Backend is working,running on http://localhost:${PORT}");
});
