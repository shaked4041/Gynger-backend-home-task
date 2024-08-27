const axios = require('axios');
const { context } = require('../utils/auth');
const paymentController = require('./payment.controller')
const loanController = require('../loans/loan.controller')


function buildPaymentUrl(authToken) {
    let url = `https://unreliable-payments-wappznbt3q-uc.a.run.app/payments?authToken=${authToken}`;
    return url;
}


async function createNewPayment(paymentData) {
    try {

        const currentDate = new Date();
        const defaultFutureTime = new Date(currentDate.getTime() + 30 * 1000).toISOString(); // Default to 30 seconds in the future
        const processAtTimestamp = paymentData.processAt || defaultFutureTime;

        if (new Date(processAtTimestamp) <= currentDate) {
            throw new Error('The processAt field must be in the future');
        }

        const loan = await loanController.readOne({ _id: paymentData.loanId });
        if (!loan) throw new Error('Loan not found');

        const authToken = context.authToken;
        if (!authToken) {
            throw new Error('Failed to retrieve auth token');
        }
        const url = buildPaymentUrl(authToken);

        const apiResponse = await axios.post(url, {
            referenceId: paymentData.referenceId,
            amount: paymentData.amount,
            cardNumber: paymentData.cardNumber,
            cardExpMonth: paymentData.cardExpMonth,
            cardExpYear: paymentData.cardExpYear,
            note: paymentData.note,
            processAt: processAtTimestamp
        }, {
            headers: { 'Content-Type': 'application/json' }
        });


        const paymentResult = apiResponse.data.result;
        console.log("New payment succeeded, API result:", paymentResult);

        const newPayment = await paymentController.create({
            amount: paymentResult.amount,
            loanId: paymentData.loanId,
            referenceId: paymentResult.referenceId,
            status: paymentResult.status,
            note: paymentResult.note,
        });

        console.log("New payment created successfully:", newPayment);

        await updateLoanPayments(newPayment._id, paymentData.loanId)

        return paymentResult;

    } catch (error) {
        console.error("Error in createNewPayment:", error.message);
        throw new Error('Failed to create new payment');
    }
}


async function updateLoanPayments(paymentId, loanId) {
    try {
        const payment = await paymentController.readOne({ _id: paymentId });
        if (!payment) {
            throw new Error('Payment not found');
        }

        const loan = await loanController.readOne({ _id: loanId });
        if (!loan) {
            throw new Error('Loan not found');
        }

        const updatedLoan = await loanController.updateById(
            loanId,
            { $addToSet: { payments: paymentId } }
        );

        if (!updatedLoan) {
            throw new Error('Failed to update loan');
        }

        return updatedLoan;

    } catch (error) {
        console.error('Error in updateLoanPayments:', error.message);
        throw new Error(`Failed to update loan payments: ${error.message}`);
    }
}


async function getPayments() {
    try {
        const authToken = context.authToken
        const url = buildPaymentUrl(authToken)

        const apiResponse = await axios.get(url, {
            headers: { 'Content-Type': 'application/json' }
        }
        )

        const paymentResults = apiResponse.data.result;
        console.log("Payments retrieved:", paymentResults);

        return paymentResults;

    } catch (error) {
        console.error("Error in getPayments:", error.message);
        throw new Error('Failed to retrieve payments from the API');
    }
}


module.exports = { createNewPayment, getPayments };


