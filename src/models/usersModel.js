const { ObjectId } = require('mongodb');
const connection = require('./connection');

const verifyIfUserAlreadyExist = async (fullName, cpf) =>
    connection()
        .then((db) => db.collection('users').findOne({ $or: [{ fullName }, { cpf }] }))
        .then((response) => {
            if (!response) return false;

            return true;
        });

const addUser = async (fullName, cpf, account, agency) =>
    connection()
        .then((db) => db
        .collection('users').insertOne({ fullName, cpf, account, agency, saldo: 0 }))
        .then((response) => ({ id: response.insertedId, fullName, cpf }));

const makeDeposit = async (id, value) =>
        connection()
            .then((db) => db
            .collection('users').updateOne({ _id: ObjectId(id) }, { $inc: { saldo: +value } }));

module.exports = {
    addUser,
    makeDeposit,
    verifyIfUserAlreadyExist,
};
