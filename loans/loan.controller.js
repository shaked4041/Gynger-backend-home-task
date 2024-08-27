const loanModel = require('./loan.model')

async function read(filter) {
    return await loanModel.find(filter)
}

async function readOne(filter, populate = '') {
    if (populate) {
        return await loanModel.findOne(filter)
            .populate('signers')
            .populate('payments')
            .exec();
    } else {

        return await loanModel.findOne(filter)
    }
}

async function create(data) {
    try {
        return await loanModel.create(data)
    } catch (error) {
        return `failed to create at controller: ${error}`
    }
}

async function updateById(id, data) {
    return await loanModel.updateOne({ _id: id }, data)
}

module.exports = { create, read, readOne, updateById }
