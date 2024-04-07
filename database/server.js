const express = require('express');
const bcrypt = require('bcrypt');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 3000;

// Connect to SQLite database
const db = new sqlite3.Database('./myGameDB.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the SQLite database.');
});

// Middleware to parse JSON bodies
app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

// Endpoint to add a new user
app.post('/user', (req, res) => {
    const { username, password } = req.body;
    const hashPassword = bcrypt.hashSync(password, 10); // Hash the password

    db.run(`INSERT INTO users (username, password) VALUES (?, ?)`, [username, hashPassword], function(err) {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        res.json({ message: 'User created', userId: this.lastID });
    });
});

// Endpoint to update a user's score
app.patch('/user/score', (req, res) => {
    const { username, scores } = req.body;

    db.run(`UPDATE users SET scores = ? WHERE username = ?`, [scores, username], function(err) {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        res.json({ message: 'Score updated', changes: this.changes });
    });
});

// Endpoint to retrieve leaderboard information
app.get('/leaderboard', (req, res) => {
    db.all(`SELECT username, scores FROM users ORDER BY scores DESC LIMIT 10`, [], (err, rows) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        res.json(rows);
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

// Handle graceful shutdown
process.on('SIGINT', () => {
    db.close((err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Closed the database connection.');
    });
    process.exit(1);
});