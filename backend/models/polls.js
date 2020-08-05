const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const optionSchema = new Schema({
    restaurant: {
        type: String,
        required: true
    },
    votes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]

});

const pollSchema = new Schema({
    date: {
        type: Date,
        required: true,
        unique: true
    },
    options: [optionSchema]
});

var Polls = mongoose.model('Poll', pollSchema);

module.exports = Polls;