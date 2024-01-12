import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
    name: { type: String, minlength: 3, maxlength: 20 },
    email: { type: String, unique: true },
    password: { type: String }
});

const UserModel = mongoose.model('User', userSchema);

export default UserModel;
