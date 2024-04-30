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

// Endpoint to add a new user with asynchronous password hashing
app.post('/user', async (req, res) => {
    const { username, password } = req.body;
    
    try {
        const hashPassword = await bcrypt.hash(password, 10);
        db.run(`INSERT INTO users (username, password, level_1_score, level_2_score, level_3_score, total_score, star_count) VALUES (?, ?, ?, ?, ?, ?, ?)`, 
               [username, hashPassword, 0, 0, 0, 0, 0], function(err) {
            if (err) {
                return res.status(400).json({ error: err.message });
            }
            res.json({ message: 'User created', userId: this.lastID });
        });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});


// Endpoint to update level 1 score
app.post('/updateLevel1Score', async (req, res) => {
    const { username, level1Score } = req.body;

    try {
        db.get(`SELECT level_1_score FROM users WHERE username = ?`, [username], async (err, user) => {
            if (err) {
                return res.status(500).json({ error: 'Database error' });
            }
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            if (level1Score > user.level_1_score) {
                db.run(`UPDATE users SET level_1_score = ? WHERE username = ?`, [level1Score, username], function(err) {
                    if (err) {
                        return res.status(500).json({ error: 'Database error' });
                    }
                    res.json({ message: 'Level 1 score updated successfully' });
                });
            } else {
                res.json({ message: 'Level 1 score not updated' });
            }
        });
    } catch (error) {
        console.error('Error updating level 1 score:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Endpoint to update level 2 score
app.post('/updateLevel2Score', async (req, res) => {
    const { username, level2Score } = req.body;

    try {
        db.get(`SELECT level_2_score FROM users WHERE username = ?`, [username], async (err, user) => {
            if (err) {
                return res.status(500).json({ error: 'Database error' });
            }
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            if (level2Score > user.level_2_score) {
                db.run(`UPDATE users SET level_2_score = ? WHERE username = ?`, [level2Score, username], function(err) {
                    if (err) {
                        return res.status(500).json({ error: 'Database error' });
                    }
                    res.json({ message: 'Level 2 score updated successfully' });
                });
            } else {
                res.json({ message: 'Level 2 score not updated' });
            }
        });
    } catch (error) {
        console.error('Error updating level 2 score:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Endpoint to update level 3 score
app.post('/updateLevel3Score', async (req, res) => {
    const { username, level3Score } = req.body;

    try {
        db.get(`SELECT level_3_score FROM users WHERE username = ?`, [username], async (err, user) => {
            if (err) {
                return res.status(500).json({ error: 'Database error' });
            }
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            if (level3Score > user.level_3_score) {
                db.run(`UPDATE users SET level_3_score = ? WHERE username = ?`, [level3Score, username], function(err) {
                    if (err) {
                        return res.status(500).json({ error: 'Database error' });
                    }
                    res.json({ message: 'Level 3 score updated successfully' });
                });
            } else {
                res.json({ message: 'Level 3 score not updated' });
            }
        });
    } catch (error) {
        console.error('Error updating level 3 score:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// Endpoint to update a user's score
app.patch('/user/score', (req, res) => {
    const { username, level_1_score, level_2_score, level_3_score } = req.body;
    const total_score = level_1_score + level_2_score + level_3_score;

    db.run(`UPDATE users SET level_1_score = ?, level_2_score = ?, level_3_score = ?, total_score = ? WHERE username = ?`, 
           [level_1_score, level_2_score, level_3_score, total_score, username], function(err) {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        res.json({ message: 'Scores updated', changes: this.changes });
    });
});

app.get('/leaderboard', (req, res) => {
    db.all(`SELECT username, total_score FROM users ORDER BY total_score DESC LIMIT 10`, [], (err, rows) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        res.json(rows);
    });
});

// Endpoint to get level 1 scores
app.get('/leaderboard/level1', (req, res) => {
    db.all(`SELECT username, level_1_score FROM users ORDER BY level_1_score DESC LIMIT 5`, [], (err, rows) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        res.json(rows);
    });
});

// Endpoint to get level 2 scores
app.get('/leaderboard/level2', (req, res) => {
    db.all(`SELECT username, level_2_score FROM users ORDER BY level_2_score DESC LIMIT 5`, [], (err, rows) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        res.json(rows);
    });
});

// Endpoint to get level 3 scores
app.get('/leaderboard/level3', (req, res) => {
    db.all(`SELECT username, level_3_score FROM users ORDER BY level_3_score DESC LIMIT 5`, [], (err, rows) => {
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