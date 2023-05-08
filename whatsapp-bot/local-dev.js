const dotenv = require('dotenv');
dotenv.config({ path: 'app/config/.env' });
const mongoose = require('mongoose');
const { app } = require('./index');

// Connect to MongoDB using Mongoose
mongoose
    .connect("mongodb://root:root@ac-loexyba-shard-00-00.1pmwlf7.mongodb.net:27017,ac-loexyba-shard-00-01.1pmwlf7.mongodb.net:27017,ac-loexyba-shard-00-02.1pmwlf7.mongodb.net:27017/boongg?replicaSet=atlas-pitt62-shard-0&ssl=true&authSource=admin", {

    })
    .then(() => {
        console.log('Successfully connected to MongoDB. running local-dev');

        // Set port and listen for requests
        const PORT = process.env.PORT || 8080;
        app.listen(PORT, () => {
            console.log(`Local server is running on port ${PORT}.`);
        });
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
        process.exit(1);
    });

const db = { mongoose };
module.exports = db;
