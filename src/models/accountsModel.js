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

const addAccount = async (obj) =>
    connection()
        .then((db) => db
        .collection('accounts').insertOne({ ...obj, amount: 0 }))
        .then((response) => {
            const { password, ...rest } = obj;
            return { id: response.insertedId, ...rest };
        });

const loginAccount = async (cpf, password) =>
    connection()
        .then((db) => db.collection('accounts').findOne({ cpf, password }))
        .then((response) => {
            const { _id } = response;

            return { id: _id, cpf };
        });

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
    loginAccount,
    makeTransfer,
    getAccountInfo,
    verifyIfAccountAlreadyExist,
};
