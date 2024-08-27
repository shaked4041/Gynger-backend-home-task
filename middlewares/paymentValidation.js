

const validatePaymentData = (req, res, next) => {
    const { amount, loanId, referenceId, cardNumber, cardExpMonth, cardExpYear, note, processAt } = req.body;

    const errors = [];

    if (amount === undefined || amount <= 0 || !Number.isInteger(amount)) {
        errors.push('Amount must be a positive integer in pennies.');
    }

    if (!loanId) {
        errors.push('Loan ID is required.');
    }

    if (!referenceId) {
        errors.push('Reference ID is required.');
    }

    if (!cardNumber || !/^\d{16}$/.test(cardNumber)) {
        errors.push('Card number must be a 16-digit integer.');
    }

    if (cardExpMonth === undefined || cardExpMonth < 1 || cardExpMonth > 12) {
        errors.push('Card expiration month must be between 1 and 12.');
    }

    const currentYear = new Date().getFullYear();
    if (cardExpYear === undefined || cardExpYear < currentYear) {
        errors.push('Card expiration year must be the current year or later.');
    }

    if (processAt && isNaN(Date.parse(processAt))) {
        errors.push('ProcessAt must be a valid ISO 8601 date.');
    }

    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }

    next();
};

module.exports = validatePaymentData;
