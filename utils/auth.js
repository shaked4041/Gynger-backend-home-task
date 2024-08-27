require('dotenv').config();

const context = {
    authToken: process.env.AUTH_TOKEN
};

module.exports = {
    context,
};
