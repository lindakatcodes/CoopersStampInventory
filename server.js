// Require express for routing
const express = require('express')
// app actually starts the express router
const app = express()

// .get 'gets' a route, then has a function that tells the browser what to do when that route is hit
app.get('/', function(req, res) {
    // right now, it's sending the main index file
    res.sendFile(__dirname + '/views/index.html')
})

// .use will mount middleware functions to express - this one tells express to server the public folder to all routes
app.use(express.static(__dirname + '/public/'))

// set the app to listen to a particular port
app.listen(process.env.PORT || 3000 );

// export the app so node can see and use it
module.exports = app;