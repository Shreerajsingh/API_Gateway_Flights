const { StatusCodes } = require("http-status-codes");
const { UserService } = require("../services");
const { SuccessResponse, ErrorResponse } = require("../utils/common");

async function signup(req, res) {
    try {
        const user = await UserService.create({
            email: req.body.email,
            password: req.body.password
        });
        
        SuccessResponse.data = user;
        return res.status(StatusCodes.CREATED).json(SuccessResponse);
    } catch (error) {
        console.log(error);
        ErrorResponse.error = error;
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}

async function signin(req, res) {
    try {
        const user = await UserService.signIn({
            email: req.body.email,
            password: req.body.password
        });
        
        SuccessResponse.data = user;
        return res.status(StatusCodes.CREATED).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}

async function addRoleToUser(req, res) {
    try {
        const response = await UserService.addRoleToUser({
            id: req.body.id,
            role: req.body.role
        })

        SuccessResponse.data = response;
        return res.status(StatusCodes.CREATED).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}

// async function updateUser(req, res) {
//     try {
//         const response = await UserService.updateUser(req.params.id, req.body);

//         SuccessResponse.data = response;
//         return res.status(StatusCodes.OK).json(SuccessResponse);
//     } catch (error) {
//         ErrorResponse.error = error;

//         return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
//     }
// }

// async function deleteUser(req, res) {
//     try {
//         const response = await UserService.destroyUser(req.params.id);

//         SuccessResponse.data = response;
//         return res.status(StatusCodes.OK).json(SuccessResponse);
//     } catch (error) {
//         ErrorResponse.error = error;

//         return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
//     }
// }

module.exports = {
    signup,
    signin,
    addRoleToUser
    // updateUser,
    // deleteUser
}