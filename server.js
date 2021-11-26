// Main Entry Point of Application

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Define the User Routes for CRUD operations
const userRoutes = require('./app/routes/User')

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())


// Connect to  MongoDB Database using mongoose
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Database Connected.");    
}).catch(err => {
    console.log('Could not connect to database.', err);
    process.exit();
});


// Routes and Statistics
let count = 0
app.use('/', userRoutes)


// Listen on specified Port
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});
