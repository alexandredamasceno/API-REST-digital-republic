const { addNewAccount, makeNewDeposit, makeNewTransfer } = require('../services/accountsService');

const registerAccount = async (req, res) => {
    const { fullName, cpf } = req.body;

    const user = await addNewAccount(fullName, cpf);

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

module.exports = {
    registerAccount,
    makeDeposit,
    makeTransfer,
};
