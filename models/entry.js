const mongoose = require('mongoose');

const entrySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        enum: ['entry','exit'],
        required: true
    },
    temperature: {
        type: Number
    }
}, {
    timestamps: true
});

const Entry = mongoose.model('Entry', entrySchema);

module.exports = Entry;