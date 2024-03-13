import { Schema, model, Document } from 'mongoose';
import jwt from 'jsonwebtoken';
import { UserDocument } from './userDocument';
import { JWT_KEY } from '../utils/config';

const userSchema = new Schema({
    name: { type: String, minlength: 3, maxlength: 50 },
    email: { type: String, unique: true },
    password: { type: String },
    isAdmin : { type : Boolean }
});


userSchema.methods.generateAuthToken = function() {    
    return jwt.sign({_id : this.id, isAdmin : this.isAdmin}, JWT_KEY);
}
    
const UserModel = model<UserDocument>('User', userSchema);

export default UserModel;
