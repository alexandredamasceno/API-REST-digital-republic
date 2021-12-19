const { addNewAccount, makeNewDeposit,
    makeNewTransfer, accountInfo,
    getLogin } = require('../services/accountsService');

const registerAccount = async (req, res) => {
    const { fullName, cpf, password } = req.body;

    const user = await addNewAccount(fullName, cpf, password);

    return res.status(201).json(user);
};

const makeDeposit = async (req, res) => {
    const { value } = req.body;
    const { id } = req.user;

    const account = await makeNewDeposit(id, value);

    return res.status(200).json(account);
};

const makeTransfer = async (req, res) => {
    const { account, agency, cpf, value } = req.body;

    const transfer = await makeNewTransfer(account, agency, cpf, value);

    return res.status(200).json(transfer);
};

const getAccountInfo = async (req, res) => {
    const { id } = req.user;
    console.log(id);
    const account = await accountInfo(id);

    return res.status(200).json(account);
};

const loginAccount = async (req, res) => {
    const { cpf, password } = req.body;

    const account = await getLogin(cpf, password);

    return res.status(200).json(account);
};

module.exports = {
    makeDeposit,
    makeTransfer,
    loginAccount,
    getAccountInfo,
    registerAccount,
};
