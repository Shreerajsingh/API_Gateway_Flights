const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const ServerConfig = require('../../config/server-config')

function checkPassword(userPassword, encryptedPassword) {
    try {
        return bcrypt.compareSync(userPassword, encryptedPassword);
    } catch (error) {
        return error;
    }
}

function createToken(input) {
    try {
        const token = jwt.sign(input, ServerConfig.JWT_SECRET, {expiresIn: ServerConfig.JWT_EXPIRY});

        return token;
    } catch (error) {
        return error;
    }
}

module.exports = {
    checkPassword,
    createToken
}