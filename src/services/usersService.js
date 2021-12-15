const { addUser, verifyIfUserAlreadyExist, makeDeposit } = require('../models/usersModel');
const { createToken } = require('../token/index');

const messageUserAlreadyExist = {
    message: 'User already exist',
};

const addNewUser = async (fullName, cpf) => {
    console.log('User', await verifyIfUserAlreadyExist(fullName, cpf));
    if (await verifyIfUserAlreadyExist(fullName, cpf) === true) {
        return messageUserAlreadyExist;
    }
    const user = await addUser(fullName, cpf);

    const token = createToken(user);

    return { ...user, token };
};

const makeNewDeposit = async (id, value) => {
    const deposited = await makeDeposit(id, value);
    console.log(deposited);

    return deposited;
};

module.exports = {
    addNewUser,
    makeNewDeposit,
};
