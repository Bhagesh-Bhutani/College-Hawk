const mongoose = require('mongoose');
require('mongoose-type-url');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    qrcode_url: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        enum: ['student','faculty'],
        required: true
    },
    entered: {
        type: Boolean,
        default: false,
        required: true
    }
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;