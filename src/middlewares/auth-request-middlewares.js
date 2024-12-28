const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../utils/common");
const AppError = require("../utils/error/app-error");
const { UserService } = require("../services");

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

async function checkAuth(req, res, next) {
    try {
        const response = await UserService.isAuthenticated(req.headers['x-access-token']);
        
        if(response) {
            req.user = response;
            next();
        }
    } catch (error) {
        return res.status(error.statusCode).json(error);
    }
}
module.exports = {
    validateAuthRequest,
    checkAuth
}