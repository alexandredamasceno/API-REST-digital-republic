require('dotenv').config();
const jwt = require('jsonwebtoken');

const { SECRET } = process.env;

module.exports = (object) => {
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