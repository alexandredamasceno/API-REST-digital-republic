const { addAccount,
    verifyIfAccountAlreadyExist,
    makeDeposit,
    getAccountInfo, 
    makeTransfer,
} = require('../models/accountsModel');
const { createToken } = require('../token/index');
const { createAccountAndAgency } = require('../helpers/createBankInfos');

const messageUserAlreadyExist = {
    message: 'User already exist',
};

const messageToNegativeValue = {
    message: 'Invalid value',
};

const messageMaxDepositValue = {
    message: 'Value can not be more than R$ 2.000,00',
};

const messageInvalidTransfer = {
    message: 'Invali transfer. Please, check your data and try again!',
};

const addNewAccount = async (fullName, cpf) => {
    const { account, agency } = createAccountAndAgency();

    if (await verifyIfAccountAlreadyExist(fullName, cpf) === true) {
        return messageUserAlreadyExist;
    }
    const user = await addAccount(fullName, cpf, account, agency);

    const token = createToken(user);

    return { ...user, token };
};

const makeNewDeposit = async (id, value) => {
    if (value > 2000) return messageMaxDepositValue;
    if (value < 0 || typeof value === 'string') return messageToNegativeValue;
    await makeDeposit(id, value);
    
    const { account, agency, amount } = await getAccountInfo(id);
    
    return { account, agency, amount };
};

const makeNewTransfer = async (account, agency, cpf, value) => {
    if (value < 0 || typeof value === 'string') return messageToNegativeValue;
    const transfer = await makeTransfer(account, agency, cpf, value);
    
    if (!transfer) return messageInvalidTransfer;
    
    return { account, agency, value };
};

const accountInfo = async (id) => {
    const account = await getAccountInfo(id);

    return account;
};

module.exports = {
    accountInfo,
    addNewAccount,
    makeNewDeposit,
    makeNewTransfer,
};
