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
    const { id, fullName } = object;
    const payload = {
        id,
        fullName,
    };

    const jwtConfig = {
        expiresIn: '7d',
        algorithm: 'HS256',
    };

    const token = jwt.sign(payload, SECRET, jwtConfig);

    return token;
};

const validateToken = (req, res, next) => {
    try {
        const token = req.headers.authorization;

        if (!token) return messageTokenNotFound;

        const result = jwt.verify(token, SECRET);

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