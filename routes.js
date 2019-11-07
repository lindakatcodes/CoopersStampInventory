const express = require('express');
const router = new express.Router();
const Parts = require('./models');

// .get 'gets' a route, then has a function that tells the browser what to do when that route is hit
router.get('/', async (req, res) => {
    try {
        const data = await Parts.find();
        console.log(data);
        res.sendFile(__dirname + '/index.html');
    }
    catch (e) {
        res.status(500).send();
    }
    
});




// export the router for use in our main app
module.exports = router;