const sqlite3 = require('sqlite3');
const {open} = require('sqlite');
const bcrypt = require('bcrypt');

(async () => {
    try {
        // Open the database
        const db = await open({
            filename: './myGameDB.db',
            driver: sqlite3.Database
        });
        console.log('Connected to the SQLite database.');

        // Create users table
        await db.exec(`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL,
            level INTEGER DEFAULT 1,
            scores INTEGER DEFAULT 0
        )`);
        console.log('Users table is ready.');

    } catch (err) {
        console.error(err.message);
    }
})();

