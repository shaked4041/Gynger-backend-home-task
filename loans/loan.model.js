const mongoose = require('mongoose')

const loanSchema = new mongoose.Schema({
    principalAmount: {
        type: Number,
        required: true
    },
    feeAmount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'paidOff'],
        default: 'active'
    },
    signers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Signer'
    }],
    payments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Payment'
    }]
}, {
    timestamps: true
})

const loanModel = mongoose.model('Loan', loanSchema)
module.exports = loanModel;