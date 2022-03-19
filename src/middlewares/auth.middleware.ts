import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { sendResponse } from '../utils/api.util';
import { StatusCodes } from 'http-status-codes';

async function authHandler(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.includes('Bearer')) {
        return sendResponse(res, {
            success: false,
            statusCode: StatusCodes.UNAUTHORIZED,
            message: 'Unauthorized error'
        });
    }

    try {
        const token = authHeader.split(' ')[1];

        const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET!);
        req.body.$auth = payload;

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