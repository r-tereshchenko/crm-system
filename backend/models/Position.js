const mongoose = require('mongoose')

const positionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    cost: {
        type: Number,
        required: true
    },
    category: {
        ref: 'categories',
        type: mongoose.Types.ObjectId
    },
    user: {
        ref: 'users',
        type: mongoose.Types.ObjectId
    }

})

module.exports = mongoose.model('positions', positionSchema)
