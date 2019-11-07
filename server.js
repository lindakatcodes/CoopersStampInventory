// Require express for routing, mongoose for mongo handling
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT;
const mongodbUrl = process.env.MONGODB_URL;

// import router files here
const routes = require('./routes');

// connect mongoose to mongodb, set options
mongoose.connect(mongodbUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(
    () => console.log('Database connected!'),
    (err) => console.log('Connection error: ', err) 
);

// app actually starts the express router
const app = express();

// .use will mount middleware functions to express
// static will direct express to use public folder for static pages
// json will assist express in processing json files
app.use(express.static(__dirname + '/public/'))
app.use(express.json());

// set app to use router files here
app.use(routes);

// set the app to listen to a particular port
app.listen(port || 3000, () => {
    console.log(`Server is up on port ${port}`)
})

// export the app so node can see and use it
module.exports = app;