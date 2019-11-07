const mongoose = require('mongoose');

// create a schema for each item - determines what each item should have
const partsSchema = new mongoose.Schema({
    name: {
        type: String
    },
    qty: {
        type: Number
    }
});

// Allow that schema to be accessed by the other files
const Parts = mongoose.model('Parts', partsSchema)

module.exports = Parts;