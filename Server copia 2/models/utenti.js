const mongoose = require('mongoose');

// Da mettere  a fine progetto così da fare tutto in maniera esatta
// email: {
//     type: String,
//     trim: true,
//     lowercase: true,
//     unique: true,
//     required: 'Email address is required',
//     validate: [validateEmail, 'Please fill a valid email address'],
//     match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
// }

const utentiSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,

    },
    password: {
        type: String,
        required: true,

    },
    created: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('User', utentiSchema);