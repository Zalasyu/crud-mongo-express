const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    age: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        default: '',
        unqiue: true,
        required: true
    },
    phoneNumber: String,
    required: false
});

const user = new mongoose.model('User', schema);

module.exports = user;
