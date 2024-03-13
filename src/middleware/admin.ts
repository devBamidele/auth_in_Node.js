import { Response, NextFunction } from "express";
import { AuthenticatedRequest } from "../models/authenticatedRequest";


export const admin = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {

    if(!req.user.isAdmin) return res.status(403).send('Access Denied');

    next()
};
