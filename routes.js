const express = require('express');
const router = new express.Router();
const Parts = require('./models');

// .get 'gets' a route, then has a function that tells the browser what to do when that route is hit
router.get('/', (req, res) => {
    try {
        res.sendFile(__dirname + '/index.html');
    }
    catch (e) {
        res.status(500).send();
    }
});

router.get('/getdata', async (req, res) => {
    try {
        res.send(await Parts.find());
    }
    catch (e) {
        res.send(e);
    }
})




// export the router for use in our main app
module.exports = router;