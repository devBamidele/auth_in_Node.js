import { Document } from 'mongoose';


// Define the user model
export interface UserDocument extends Document {
    name?: string;
    email?: string;
    password?: string;
    generateAuthToken(): string;
}