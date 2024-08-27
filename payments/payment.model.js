const mongoose = require('mongoose')

const paymentSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true
    },
    loanId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Loan',
        required: true
    },
    status: {
        type: String,
        enum: ['Created', 'Pending', 'Failed', 'Successful'],
        default: 'Created'
    },
    referenceId: {
        type: String,
        required: true
    },
    note:{
        type: String,
        required: false
    },
}, {
    timestamps: true
})

const paymentModel = mongoose.model('Payment', paymentSchema)
module.exports = paymentModel;