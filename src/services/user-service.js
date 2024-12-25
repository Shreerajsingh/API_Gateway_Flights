const { StatusCodes } = require("http-status-codes");
const { UserRepository } = require("../repositories");
const AppError = require("../utils/error/app-error");
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

module.exports = {
    create
}