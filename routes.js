// .get 'gets' a route, then has a function that tells the browser what to do when that route is hit
app.get('/', function(req, res) {
    // right now, it's sending the main index file
    res.sendFile(__dirname + '/views/index.html')
})