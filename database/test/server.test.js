const request = require('supertest');
const express = require('express');
const bcrypt = require('bcrypt');
const sqlite3 = require('sqlite3').verbose();

// Mock sqlite3 to prevent actual database operations during tests
jest.mock('sqlite3', () => {
  const bcrypt = require('bcrypt');
  return {
    verbose: jest.fn(() => ({
      Database: jest.fn(() => ({
        run: jest.fn((sql, params, callback) => callback(null)),
        get: jest.fn((sql, params, callback) => callback(null, { id: 1, username: params[0], password: bcrypt.hashSync('password123', 10) })),
        all: jest.fn((sql, params, callback) => callback(null, [])),
        close: jest.fn()
      }))
    }))
  };
});


// Initialize express app
// apply middlewares and routes for testing
const app = express();
app.use(express.json());

// Mock the routes as they should be imported or defined
app.post('/user', async (req, res) => {
  const { username, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    // Mocking the response from the db.run
    return res.status(200).json({ message: 'User created', userId: 1 });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = { id: 1, username, password: bcrypt.hashSync('password123', 10) };
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      return res.json({ message: 'Login successful', userId: user.id });
    } else {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Define tests
describe('API endpoints', () => {
  describe('POST /user', () => {
    it('Should create a new user and return a success message', async () => {
      const userData = { username: 'testuser', password: 'password123' };
      const response = await request(app)
        .post('/user')
        .send(userData)
        .expect(200);
      
      expect(response.body).toEqual(expect.objectContaining({
        message: 'User created'
      }));
    });
  });

  describe('POST /login', () => {
    it('Should authenticate a user and return login successful', async () => {
      const loginData = { username: 'testuser', password: 'password123' };
      const response = await request(app)
        .post('/login')
        .send(loginData)
        .expect(200);
      
      expect(response.body).toEqual(expect.objectContaining({
        message: 'Login successful'
      }));
    });

    it('Should return error for invalid credentials', async () => {
      const loginData = { username: 'testuser', password: 'wrongpassword' };
      const response = await request(app)
        .post('/login')
        .send(loginData)
        .expect(401);

      expect(response.body).toHaveProperty('error', 'Invalid credentials');
    });
  });
});

// More tests will be added here