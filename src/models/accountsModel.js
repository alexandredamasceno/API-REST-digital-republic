const { ObjectId } = require('mongodb');
const connection = require('./connection');

function redirect(response) {
    if (!response) return false;

    return true;
}

const verifyIfAccountAlreadyExist = async (fullName, cpf) =>
    connection()
        .then((db) => db.collection('accounts').findOne({ $or: [{ fullName }, { cpf }] }))
        .then((response) => redirect(response));

const getAccountInfo = async (id) =>
        connection()
            .then((db) => db.collection('accounts').findOne({ _id: ObjectId(id) }));

const addAccount = async (fullName, cpf, account, agency) =>
    connection()
        .then((db) => db
        .collection('accounts').insertOne({ fullName, cpf, account, agency, amount: 0 }))
        .then((response) => ({ id: response.insertedId, fullName, cpf, account, agency }));

const makeDeposit = async (id, value) =>
        connection()
            .then((db) => db
                .collection('accounts')
                    .updateOne({ _id: ObjectId(id) }, { $inc: { amount: +value } }))
                        .then((response) => redirect(response));

const makeTransfer = async (account, agency, cpf, value) =>
        connection()
            .then((db) => db
                .collection('accounts')
                    .updateOne({ cpf }, { $inc: { amount: +value } }))
                        .then((response) => {
                            if (!response.matchedCount) return null;

                            return { account, agency, value };
                        });

module.exports = {
    addAccount,
    makeDeposit,
    makeTransfer,
    getAccountInfo,
    verifyIfAccountAlreadyExist,
};
