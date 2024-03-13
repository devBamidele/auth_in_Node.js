import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_KEY } from '../utils/config';
import { AuthenticatedRequest } from "../models/authenticatedRequest";


export const auth = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const token = req.headers['x-auth-token'] as string;

    if (!token) return res.status(401).send('Access denied. No token provided.');
    
    try {
        const decoded = jwt.verify(token, JWT_KEY) as { _id: string, isAdmin : boolean };
        req.user = decoded; // Attach the decoded user to the request object

        next();
    } catch (e) {
        return res.status(400).send('Invalid token.');
    }
};
