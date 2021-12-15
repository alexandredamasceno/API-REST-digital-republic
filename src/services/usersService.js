const { addUser, verifyIfUserAlreadyExist, makeDeposit } = require('../models/usersModel');
const { createToken } = require('../token/index');
const { createAccountAndAgency } = require('../helpers/createBankInfos');

const messageUserAlreadyExist = {
    message: 'User already exist',
};

const addNewUser = async (fullName, cpf) => {
    const { account, agency } = createAccountAndAgency();

    if (await verifyIfUserAlreadyExist(fullName, cpf) === true) {
        return messageUserAlreadyExist;
    }
    const user = await addUser(fullName, cpf, account, agency);

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
