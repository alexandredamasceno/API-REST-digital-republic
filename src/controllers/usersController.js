const { addNewUser } = require('../services/usersService');

const registerUser = async (req, res) => {
    console.log(req.body);
    const { fullName, cpf } = req.body;

    const user = await addNewUser(fullName, cpf);

    return res.status(201).json(user);
};

// const makeDeposit = async (req, res) => {
//     const 
// };

module.exports = {
    registerUser,
};
