import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { sendResponse } from '../utils/api.util';
import { StatusCodes } from 'http-status-codes';

async function authHandler(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];

    try {
        if (!authHeader || !authHeader.includes('Bearer')) {
            return sendResponse(res, {
                success: false,
                statusCode: StatusCodes.UNAUTHORIZED,
                message: 'Unauthorized error'
            });
        }

        const accessToken = authHeader.split(' ')[1];

        jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET!);

        return next();
    } catch (error) {
        return sendResponse(res, {
            success: false,
            statusCode: StatusCodes.UNAUTHORIZED,
            message: 'Unauthorized error'
        });
    }
}

export default authHandler;