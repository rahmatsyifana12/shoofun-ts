import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { sendResponse } from '../utils/api.util';
import { StatusCodes } from 'http-status-codes';

import User from '../entities/user.entity';
import {
    loginUserType,
    registerUserType
} from '../validations/user.validation';
import config from '../config';

let refreshTokens: string[] = [];

async function addUser(req: Request, res: Response) {
    const body = req.body as registerUserType;
    const foundUser = await User.findOne({ where: { email: body.email } });

    if (foundUser) {
        return sendResponse(res, {
            success: false,
            statusCode: StatusCodes.BAD_REQUEST,
            message: 'This account is already exist'
        });
    }

    const hashedPassword = bcrypt.hashSync(
        body.password,
        config.saltRounds
    );
    const user = User.create({ ...body, password: hashedPassword });

    try {
        await User.save(user);

        return sendResponse(res, {
            message: 'Successfully registered a new account'
        });
    } catch (error) {
        return sendResponse(res, {
            success: false,
            statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
            message: 'Unexpected server error'
        });
    }
}

async function loginUser(req: Request, res: Response) {
    const body = req.body as loginUserType;
    const foundUser = await User.findOne({ where: { email: body.email } });

    if (!foundUser) {
        return sendResponse(res, {
            success: false,
            statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
            message: 'Account doesn\'t exist'
        });
    }

    try {
        if (!bcrypt.compareSync(body.password, foundUser.password)) {
            return sendResponse(res, {
                success: false,
                statusCode: StatusCodes.BAD_REQUEST,
                message: 'Object of value is invalid'
            });
        }

        const accessToken = jwt.sign(
            {
                userId: foundUser.id,
                email: foundUser.email
            },
            config.jwt.accessSecret,
            {
                expiresIn: '60m'
            }
        );

        const refreshToken = jwt.sign(
            {
                userId: foundUser.id,
                email: foundUser.email
            },
            process.env.JWT_REFRESH_SECRET!
        );

        refreshTokens.push(refreshToken);

        return sendResponse(res, {
            message: 'Successfully login',
            data: {
                accessToken,
                refreshToken
            }
        });
    } catch (error) {
        return sendResponse(res, {
            success: false,
            statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
            message: 'Unexpected server error'
        });
    }
}

async function logoutUser(req: Request, res: Response) {
    const authHeader = req.headers['authorization'];
    const refreshToken = authHeader!.split(' ')[1];

    try {
        refreshTokens = refreshTokens.filter((rt) => rt !== refreshToken);

        return sendResponse(res, {
            message: 'Logged out of session successfully'
        });
    } catch (error) {
        return sendResponse(res, {
            success: false,
            statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
            message: 'Unexpected server error'
        });
    }
}

async function refreshAccessToken(req: Request, res: Response) {
    const authHeader = req.headers['authorization'];
    const refreshToken = authHeader!.split(' ')[1];

    if (!refreshToken || !refreshTokens.includes(refreshToken)) {
        return sendResponse(res, {
            success: false,
            statusCode: StatusCodes.UNAUTHORIZED,
            message: 'Unauthorized error'
        });
    }

    jwt.verify(
        refreshToken,
        process.env.JWT_REFRESH_SECRET!,
        { complete: true },
        async (err, userPayload) => {
            if (err) {
                return sendResponse(res, {
                    success: false,
                    statusCode: StatusCodes.UNAUTHORIZED,
                    message: 'Unauthorized error'
                });
            }

            const user = userPayload as jwt.JwtPayload;

            const accessToken = jwt.sign(
                {
                    userId: user.userId,
                    email: user.email
                },
                config.jwt.accessSecret,
                {
                    expiresIn: '60m'
                }
            );

            return sendResponse(res, {
                message: 'Successfully refresh a new access token',
                data: {
                    accessToken
                }
            });
        }
    );
}

export default {
    addUser, loginUser, logoutUser, refreshAccessToken
};