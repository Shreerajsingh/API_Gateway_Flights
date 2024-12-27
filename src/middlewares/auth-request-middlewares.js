const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../utils/common");
const AppError = require("../utils/error/app-error");

async function validateAuthRequest(req, res, next) {
    if(!req.body.email) {
        ErrorResponse.message = "Somthing went wrong while authenticating user"
        ErrorResponse.error = new AppError(["Email not found in incoming request in correct form"], StatusCodes.BAD_REQUEST);

        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
    if(!req.body.password) {
        ErrorResponse.message = "Somthing went wrong while authenticating user"
        ErrorResponse.error = new AppError(["Password not found in incoming request in correct form"], StatusCodes.BAD_REQUEST);

        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
    next();
}

module.exports = {
    validateAuthRequest
}