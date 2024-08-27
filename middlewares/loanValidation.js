const mongoose = require('mongoose');

const validateLoanData = (req, res, next) => {
    const { principalAmount, feeAmount, status, signers = [], payments = [] } = req.body;

    const errors = [];

    if (principalAmount === undefined || typeof principalAmount !== 'number' || principalAmount <= 0) {
        errors.push('Principal amount must be a positive number.');
    }

    if (feeAmount === undefined || typeof feeAmount !== 'number' || feeAmount < 0) {
        errors.push('Fee amount must be a non-negative number.');
    }

    const validStatuses = ['active', 'paidOff'];
    if (status && !validStatuses.includes(status)) {
        errors.push('Status must be either "active" or "paidOff".');
    }

    if (signers && !Array.isArray(signers)) {
        errors.push('Signers must be an array of ObjectIds.');
    } else if (signers) {
        for (const signerId of signers) {
            if (!mongoose.Types.ObjectId.isValid(signerId)) {
                errors.push(`Signer ID "${signerId}" is not a valid ObjectId.`);
            }
        }
    }

    if (!Array.isArray(payments)) {
        errors.push('Payments must be an array of ObjectIds.');
    } else {
        for (const paymentId of payments) {
            if (!mongoose.Types.ObjectId.isValid(paymentId)) {
                errors.push(`Payment ID "${paymentId}" is not a valid ObjectId.`);
            }
        }
    }

    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }

    next();
};

module.exports = validateLoanData;
