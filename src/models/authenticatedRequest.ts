import { Request } from "express";

export interface AuthenticatedRequest extends Request {
    user?: any; // Define the user property on the Request object
    
}