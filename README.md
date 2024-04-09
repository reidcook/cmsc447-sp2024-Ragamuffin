# web-game
CMSC 447 Web Game autorunner like project

First install all necessary packages
npm install phaser
npm i phaser3-rex-plugins
npm install sqlite3

To begin you need to initialialize and run the database server

DataBase for Phaser Web Game

Navigate to the database directory when running the following two commands

Initialize database:
node initializeDb.js

Start the server:
node server.js

Now you need to run the game server

to start http server run the following in the directory with index.html
    python3 -m http.server 8000
    connect to http://localhost:8000/
ensure phaser 3.80.1 installed


