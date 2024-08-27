const signerModel = require('./signer.model')

async function read(filter) {
    return await signerModel.find(filter)
}

async function readOne(filter) {
    return await signerModel.findOne(filter)
}

async function create(data) {
    return await signerModel.create(data)
}

async function updateById(id, data) {
    return await signerModel.updateOne({ _id: id }, data)
}

module.exports = { create, read, readOne, updateById }
