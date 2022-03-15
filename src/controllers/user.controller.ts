import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { sendResponse } from '../utils/api.util';
import { StatusCodes, getReasonPhrase } from 'http-status-codes';

import User from '../entities/user.entity';

let refreshTokens = [];

async function addUser(req: Request, res: Response) {
    const { body } = req;

    const user = User.create({
        email: body.email,
        password: body.password,
        displayName: body.displayName,
        address: body.address,
        phoneNumber: body.phoneNumber
    });

    const foundUser = await User.findOne({ where: { email: user.email } });
    if (foundUser) {
        return sendResponse(res, {
            success: false,
            statusCode: StatusCodes.BAD_REQUEST,
            message: 'This account is already exist'
        });
    }

    const hashedPassword = bcrypt.hashSync(
        user.password,
        parseInt(process.env.SALT_ROUNDS!)
    );

    try {
        user.password = hashedPassword;
        await User.save(user);

        return sendResponse(res, {
            message: 'Successfully registered a new account'
        });
    } catch (error) {
        return sendResponse(res, {
            success: false,
            statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
            message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR)
        });
    }
}

async function loginUser(req: Request, res: Response) {
    const { body } = req;
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
                userId: body.id,
                email: body.email
            },
            process.env.JWT_ACCESS_SECRET!,
            {
                expiresIn: '15m'
            }
        );

        const refreshToken = jwt.sign(
            {
                userId: body.id,
                email: body.email
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
            message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR)
        });
    }
}

export default { addUser, loginUser };