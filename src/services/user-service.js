const { StatusCodes } = require('http-status-codes');
const { UserRepository } = require('../repositories');
const AppError = require('../utils/error/app-error');
const { Auth } = require('../utils/common');

const userRepository = new UserRepository();

async function create(data) {
    try {
        const response = await userRepository.create(data);

        return response;
    } catch (error) {
        if(error.name == "SequelizeUniqueConstraintError" || error.name == "SequelizeValidationError") {
            let explaination = [];

            error.errors.forEach((err) => {
                explaination.push(err.message);
            });

            throw new AppError(explaination, StatusCodes.BAD_REQUEST);
        }
        throw new AppError("Cannot create a new user object", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function signIn(data) {
    try {
        const {email, password} = data;
        const user = await userRepository.checkEmail(email);

        if(!user) {
            throw new AppError("No user found for given email", StatusCodes.NOT_FOUND);
        }

        const passwordMatch = Auth.checkPassword(password, user.password);

        if(!passwordMatch) {
            throw new AppError("Incorrect password", StatusCodes.BAD_REQUEST);
        }

        const jwtToken = Auth.createToken({id: user.id, email: email});

        return jwtToken;
    } catch (error) {
        if(error instanceof AppError) {
            throw error;
        }
        throw error;
    }
}

async function isAuthenticated(token) {
    try {
        if(!token) {
            throw new AppError("Missing JWT token", StatusCodes.BAD_REQUEST);
        }

        const response = Auth.verifyToken(token);
        console.log(response);
        const user = await userRepository.get(response.id);

        if(!user) {
            throw new AppError("User not found", StatusCodes.BAD_REQUEST);
        }

        return user.id;
    } catch (error) {
        if(error instanceof AppError) throw error;
        
        if(error.name == 'JsonWebTokenError') {
            throw new AppError("Invalid JWT token", StatusCodes.BAD_REQUEST);
        }

        if(error.name == 'TokenExpiredError') {
            throw new AppError("JWT token expired", StatusCodes.BAD_REQUEST);
        }

        throw new AppError("Somthing went wrong", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports = {
    create,
    signIn,
    isAuthenticated
}