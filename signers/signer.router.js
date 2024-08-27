const express = require('express')
const router = express.Router();
const signerService = require('./signer.service');
const validateSignerData = require('../middlewares/signerValidation');


router.post('/',validateSignerData, async (req, res)=>{
    try {
        const newSigner = await signerService.createNewSigner(req.body)
        res.status(201).send(newSigner)
    } catch (error) {
        console.error(error);
        res.status(500).send(error || 'something went wrong creating new signer')
    }
})

module.exports = router;
