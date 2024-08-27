const express = require('express')
const router = express.Router();
const validateLoanData = require('../middlewares/loanValidation');
const loanService = require('./loan.service');

router.get('/:loanId', async (req, res)=>{
    try {
        const loan = await loanService.getSingleLoan(req.params.loanId)
        res.status(201).send(loan)
    } catch (error) {
        console.error('Error getting loan:', error.message); 
        res.status(500).json({ error: error.message || 'An unexpected error occurred while getting the loan.' });
    }
})

router.post('/', validateLoanData, async (req, res) => {
    try {
        const newloan = await loanService.createNewloan(req.body)
        res.status(201).send(newloan)
    } catch (error) {
        console.error('Error creating loan:', error.message); 
        res.status(500).json({ error: error.message || 'An unexpected error occurred while creating the loan.' });
    }
})

module.exports = router;
