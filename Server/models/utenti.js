const mongoose = require('mongoose');

// Define the validateEmail function
function validateEmail(email) {
    // Custom validation logic for email
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
}

// User schema for the database, having email validation
const utentiSchema = mongoose.Schema({
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required:true,
        // validate: [validateEmail, 'Please fill a valid email address'],
        // match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
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
    },
    refresh_token: String
}, {
    virtuals: {
        id: {
            get() {
                return this._id
            }
        }
    }
});

module.exports = mongoose.model('User', utentiSchema);
