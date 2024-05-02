const sqlite3 = require('sqlite3');
const { open } = require('sqlite');

describe('Database Operations', () => {
    let db;

    // Open a new database connection before all tests are run
    beforeAll(async () => {
        db = await open({
            filename: ':memory:',
            driver: sqlite3.Database
        });
    });

    // Close the database connection after all tests have completed
    afterAll(async () => {
        await db.close();
    });

    // Test to check if the database connection is established
    test('Connect to the SQLite database', async () => {
        expect(db).toBeDefined();
        await expect(db.get("SELECT 1")).resolves.not.toThrow();
    });

    // Test to verify that the users table is created properly
    test('Create users table', async () => {
        const sql = `CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL,
            level INTEGER DEFAULT 1,
            level_1_score INTEGER DEFAULT 0,
            level_2_score INTEGER DEFAULT 0,
            level_3_score INTEGER DEFAULT 0,
            total_score INTEGER DEFAULT 0,
            star_count INTEGER DEFAULT 0
        )`;

        await db.exec(sql);
        const result = await db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='users';");
        expect(result.name).toBe('users');
    });

    // Test to ensure that the database connection can be closed without issues
    test('Close and reopen the database connection', async () => {
        await db.close();
        // Reopen the database to continue testing
        db = await open({
            filename: ':memory:',
            driver: sqlite3.Database
        });
        // Check if we can still perform a query after reopening
        await expect(db.get("SELECT 1")).resolves.not.toThrow();
    });
});
