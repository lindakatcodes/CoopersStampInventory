const express = require('express');
const router = new express.Router();
const Parts = require('./models');

// when the main page is loaded, pull in the index page
router.get('/', (req, res) => {
    try {
        res.sendFile(__dirname + '/index.html');
    }
    catch (e) {
        res.status(500).send();
    }
});

// route for initial data pull
router.get('/getdata', async (req, res) => {
    try {
        res.send(await Parts.find());
    }
    catch (e) {
        res.send(e);
    }
})

// route to update values
router.patch('/parts/:id', async (req, res) => {
  const update = req.body;
  try {
    const set = await Parts.findOne({name: req.params.id});
    set.qty = parseInt(update.qty, 10);
    await set.save();
    res.send(set);
  }
  catch (e) {
    console.log(e);
  }
})


// export the router for use in our main app
module.exports = router;