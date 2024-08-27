

const validateSignerData = (req, res, next) => {
    const { firstName, lastName, email } = req.body;

    const errors = [];

    if (!firstName || typeof firstName !== 'string' || firstName.trim().length === 0) {
        errors.push('First name is required and must be a non-empty string.');
    }

    if (!lastName || typeof lastName !== 'string' || lastName.trim().length === 0) {
        errors.push('Last name is required and must be a non-empty string.');
    }

    if (!email || typeof email !== 'string' || !/^[\w-.]+@([\w-]+\.)+[a-zA-Z]{2,}$/.test(email.trim())) {
        errors.push('A valid email address is required.');
    }

    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }

    next();
};

module.exports = validateSignerData;
