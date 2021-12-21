require('dotenv').config();
const jwt = require('jsonwebtoken');

const { SECRET } = process.env;

const messageTokenNotFound = {
    message: 'Token not found',
};

const messageTokenInvalid = {
    message: 'Invalid token',
};

const createToken = (object) => {
    const { id, cpf } = object;
    const payload = {
        id,
        cpf,
    };

    const jwtConfig = {
        expiresIn: '7d',
        algorithm: 'HS256',
    };

    const token = jwt.sign(payload, SECRET, jwtConfig);

    return token;
};

const validateToken = (req, res, next) => {
    const token = req.headers.authorization;
    console.log(token);

    if (!token) return res.status(404).json(messageTokenNotFound);

    try {
        const result = jwt.verify(token, SECRET);
        console.log(result);

        req.user = result;

        next();
    } catch (err) {
        console.log(err.message);
        return res.status(404).json(messageTokenInvalid);
    }
};

module.exports = {
    createToken,
    validateToken,
};