const express = require('express');
const bcrypt = require('bcrypt');
const sqlite3 = require('sqlite3').verbose();
const { body, validationResult } = require('express-validator');
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

// Validation and Sanitization for Registration
const userValidationRules = [
    body('username').trim().isLength({ min: 3 }).withMessage('Username must be at least 3 characters long'),
    body('password').isStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    }).withMessage('Password must be stronger (at least 8 characters, including an uppercase letter, a lowercase letter, a number, and a symbol)'),
    body('username').custom(async username => {
        const user = await new Promise((resolve, reject) => {
            db.get('SELECT username FROM users WHERE username = ?', [username], (err, row) => {
                if (err) reject(err);
                resolve(row);
            });
        });
        if (user) {
            return Promise.reject('Username already in use');
        }
    })
];

// testing user registration endpoint
app.post('/userRegistrationTest', userValidationRules, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;
    
    try {
        const hashPassword = await bcrypt.hash(password, 10);
        db.run(`INSERT INTO users (username, password) VALUES (?, ?)`, [username, hashPassword], function(err) {
            if (err) {
                return res.status(400).json({ error: err.message });
            }
            res.json({ message: 'User created', userId: this.lastID });
        });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Endpoint to add a new user with asynchronous password hashing
app.post('/user', async (req, res) => {
    const { username, password } = req.body;
    
    try {
        const hashPassword = await bcrypt.hash(password, 10); // Hash the password asynchronously

        db.run(`INSERT INTO users (username, password) VALUES (?, ?)`, [username, hashPassword], function(err) {
            if (err) {
                return res.status(400).json({ error: err.message });
            }
            res.json({ message: 'User created', userId: this.lastID });
        });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
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

// Login endpoint
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        db.get(`SELECT id, username, password FROM users WHERE username = ?`, [username], async (err, user) => {
            if (err) {
                return res.status(500).json({ error: 'Database error during login' });
            }
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            const match = await bcrypt.compare(password, user.password);
            if (match) {
                res.json({ message: 'Login successful', userId: user.id });
            } else {
                res.status(401).json({ error: 'Invalid credentials' });
            }
        });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
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