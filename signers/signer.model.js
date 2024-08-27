const mongoose = require('mongoose')

const signerSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    }
})

const signerModel = mongoose.model('Signer', signerSchema)
module.exports = signerModel;