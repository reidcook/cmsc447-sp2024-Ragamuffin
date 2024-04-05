DataBase for Phaser Web Game

Navigate to the database directory when running the following two commands

Initialize database:
node initializeDb.js

Start the server:
node server.js


Testing the API Endpoints

Make sure to open a new terminal window

Add a new user:
curl -X POST http://localhost:3000/user \
-H "Content-Type: application/json" \
-d '{"username": "testUser", "password": "testPass"}'

Update User Score:
curl -X PATCH http://localhost:3000/user/score \
-H "Content-Type: application/json" \
-d '{"username": "testUser", "scores": 500}'

View Leaderboard:
curl http://localhost:3000/leaderboard


Inspecting the Database

Navigate to the database directory

Directly inspect the database:
sqlite3 myGameDB.db

View all users:
SELECT * FROM users;

To Exit
.quit


Ensure Server is Running: The server needs to be running to test the endpoints. If you encounter connection errors, check if the server is active and listening on the correct port.