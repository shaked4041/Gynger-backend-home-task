const signerController = require('./signer.controller');

async function createNewSigner(data) {
    try {
        const existingSigner = await signerController.readOne({ email: data.email });
        
        if (existingSigner) {
            throw new Error(`Signer with the email: ${data.email} already exists.`);
        }

        const newSigner = await signerController.create(data);
        return newSigner;
        
    } catch (error) {
        throw new Error(`Failed to create signer: ${error.message}`);
    }
}

module.exports = { createNewSigner };
