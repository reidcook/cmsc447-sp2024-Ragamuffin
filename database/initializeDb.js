const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');

// Connect to the database
const db = new sqlite3.Database('./myGameDB.db', (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to the SQlite database.');
});

// Create users table
db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    level INTEGER DEFAULT 1,
    scores INTEGER DEFAULT 0
)`, (err) => {
    if (err) {
        console.error('Error creating users table', err.message);
        return;
    }
});