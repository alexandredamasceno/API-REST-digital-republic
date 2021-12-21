const { addAccount,
    verifyIfAccountAlreadyExist,
    makeDeposit,
    getAccountInfo, 
    makeTransfer,
    loginAccount,
    decreasesAfterIncreases,
} = require('../models/accountsModel');
const { createToken } = require('../token/index');
const { createAccountAndAgency } = require('../helpers/createBankInfos');

const messageUserAlreadyExist = {
    message: 'User already exist',
};

const messageUserDoesntExist = {
    message: 'User doesnt exist',
};

const messageFields = {
    message: 'Please fill in all fields',
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

const addNewAccount = async (fullName, cpf, password) => {
    if (!fullName || !cpf || !password) return messageFields;
    const { account, agency } = createAccountAndAgency();

    if (await verifyIfAccountAlreadyExist(fullName, cpf) === true) {
        return messageUserAlreadyExist;
    }

    const obj = {
        fullName,
        cpf,
        password,
        account,
        agency,
    };
    const user = await addAccount(obj);

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

const makeNewTransfer = async (obj) => {
    const { id, account, agency, cpf, value } = obj;    
    if (value < 0 || typeof value === 'string') return messageToNegativeValue;
    const transfer = await makeTransfer(account, agency, cpf, value);
    
    if (!transfer) {
        return messageInvalidTransfer;
    }

    await decreasesAfterIncreases(id, value);
    
    return { account, agency, value };
};

const accountInfo = async (id) => {
    const result = await getAccountInfo(id);

    return result;
};

const getLogin = async (cpf, password) => {
    if (!cpf || !password) return messageFields;
    const account = await loginAccount(cpf, password);
    if (!account) return messageUserDoesntExist;

    const token = createToken(account);

    return { token };
};

module.exports = {
    getLogin,
    accountInfo,
    addNewAccount,
    makeNewDeposit,
    makeNewTransfer,
};
