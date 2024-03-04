import { Schema, model, Document } from 'mongoose';
import jwt from 'jsonwebtoken';
import { UserDocument } from './userDocument';

const jwtPrivateKey = process.env.jwtPrivateKey ?? 'someDefaultValue';

const userSchema = new Schema({
    name: { type: String, minlength: 3, maxlength: 50 },
    email: { type: String, unique: true },
    password: { type: String }
});


userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({_id : this.id}, jwtPrivateKey);

    return token;
}

const UserModel = model<UserDocument>('User', userSchema);

export default UserModel;
