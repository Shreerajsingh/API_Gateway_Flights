const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const ServerConfig = require('../../config/server-config')

function checkPassword(userPassword, encryptedPassword) {
    try {
        return bcrypt.compareSync(userPassword, encryptedPassword);
    } catch (error) {
        throw error;
    }
}

function createToken(input) {
    try {
        const token = jwt.sign(input, ServerConfig.JWT_SECRET, {expiresIn: ServerConfig.JWT_EXPIRY});

        return token;
    } catch (error) {
        throw error;
    }
}

function verifyToken(token) {
    try {
        return jwt.verify(token, ServerConfig.JWT_SECRET);
    } catch (error) {
        throw error;
    }
}

module.exports = {
    checkPassword,
    createToken,
    verifyToken
}