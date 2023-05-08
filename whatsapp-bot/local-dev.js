const dotenv = require('dotenv');
dotenv.config({ path: 'app/config/.env' });
const db = require('./models');

const { app } = require('./index');

//const agenda = require("./app/jobs");

// Connect to MongoDB using Mongoose
db.mongoose
    .connect(process.env.MONGODB_URI, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
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
