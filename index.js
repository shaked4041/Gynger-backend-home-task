require('dotenv').config();
const express = require('express');
const db = require('./db');
const { context } = require('./utils/auth');

const port = process.env.PORT || 3000;

db.connect();

const signerRouter = require('./signers/signer.router');
const loanRouter = require('./loans/loan.router');
const paymentRouter = require('./payments/payment.router');

const app = express();
app.use(express.json());

app.use('/api/signer', signerRouter);
app.use('/api/loan', loanRouter);
app.use('/api/payment', paymentRouter);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    console.log(`Auth token: ${context.authToken}`); // Access the auth token
});