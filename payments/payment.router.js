const express = require('express')
const router = express.Router();
const paymentService = require('./payment.service');
const validatePaymentData = require('../middlewares/paymentValidation');
const { context } = require('../utils/auth'); 


router.post('/', validatePaymentData, async (req, res) => {
    try {

        const { amount, loanId, referenceId, cardNumber, cardExpMonth, cardExpYear, note, processAt } = req.body;
        
        const amountInPennies = Math.round(amount * 100);

        const payment = await paymentService.createNewPayment({
            amount: amountInPennies,
            loanId,
            referenceId,
            cardNumber,
            cardExpMonth,
            cardExpYear,
            note,
            processAt
        });

        res.status(201).json(payment);

    } catch (error) {
        console.error(error);
        res.status(500).send(error || 'something went wrong creating new payment')
    }
})

router.get(`/`, async (req, res) => {
    try {

        const payments = await paymentService.getPayments();

        res.status(200).json({ result: payments });

    } catch (error) {
        console.error('Error retrieving payments:', error.message);
        res.status(500).json({ message: 'An error occurred while retrieving payments', error: error.message });
    }
})

module.exports = router;
