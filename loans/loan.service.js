const loanController = require('./loan.controller')

async function getSingleLoan(loanId) {
    try {
        const loan = await loanController.readOne({ _id: loanId }, true)
        
        if (!loan) {
            throw new Error(`Loan does not exist`);
        }

        const totalPayments = loan.payments.reduce((sum, payment) => {
            return sum + payment.amount; 
        }, 0);

        const outstandingBalance = loan.principalAmount + loan.feeAmount - totalPayments;

        return {
            ...loan.toObject(),
            outstandingBalance
        };

    } catch (error) {
        console.error('Error fetching loan:', error.message);
        throw new Error('Error fetching loan');
    }
}

async function createNewloan(data) {
    try {

        const { principalAmount, feeAmount, status, signers, payments } = data;

        const existingLoan = await loanController.readOne({
            principalAmount: principalAmount,
            feeAmount: feeAmount
        });

        if (existingLoan) {
            throw new Error(`Loan with principal amount ${principalAmount} and fee amount ${feeAmount} already exists.`);
        }

        let newloan = await loanController.create(data)
        return newloan
    } catch (error) {
        if (error.name === 'ValidationError') {
            throw new Error(`Validation failed: ${error.message}`);
        } else {
            throw new Error(`Failed to create loan: ${error.message}`);
        }
    }
}


module.exports = { createNewloan, getSingleLoan }