const paymentModel = require('./payment.model')

async function read(filter) {
    return await paymentModel.find(filter)
}

async function readOne(filter) {
    return await paymentModel.findOne(filter)
}

async function create(data) {
    try {
        return await paymentModel.create(data)
    } catch (error) {
        return `failed to create at controller: ${error}`
    }
}

async function updateById(id, data) {
    return await paymentModel.updateOne({ _id: id }, data)
}

module.exports = { create, read, readOne, updateById }
