import { createUserResponse } from "../models/createUserResponse";
import UserModel from "../models/user";
import _ from 'lodash';
import bcrypt from 'bcrypt';
import { AuthenticationResponse } from "../models/authenticationResponse";


export const authenticateUser = async (email: string, password: string) : Promise<AuthenticationResponse> => {

    try{
        const user =  await UserModel.findOne({ email: email });

        if (!user){
            return {
                success: false,
                message: 'Invalid email or password',
            }
        }

        if(user.password){
            
            const passwordMatch = await bcrypt.compare(password, user.password);

            if (passwordMatch) {

                const token = user.generateAuthToken();

                return {
                    success: true,
                    message: 'Authentication successful',
                    token: token,
                };
            } else {
                return {
                    success: false,
                    message: 'Invalid email or password',
                };
            }
        } else {
            // Handle the case where user.password is null or undefined
            return {
                success: false,
                message: 'User password is not available',
            };
        }

    }catch(e){
        // Handle other errors
        console.error('Error during authentication:', e);


        // Rethrow the error to be caught by higher levels of the application
        throw e;
    }
};


export const addNewUser = async (name: string, email: string, password: string): Promise<createUserResponse> => {
    try {
        const user = new UserModel({
            name: name,
            email: email,
            password: password,
        });

        const salt = await bcrypt.genSalt();

        user.password = await bcrypt.hash(password, salt);

        await user.save();

        const data =  _.pick(user, ['_id' ,'name', 'email']);

        const token = user.generateAuthToken();

        return {
            success: true,
            message: 'User created successfully',
            data: data,
            token: token
        };
    } catch (e: any) {
        //console.error('Error creating a new user', e);

        if (e.code === 11000 || e.code === 11001) {
            return {
                success: false,
                message: 'User already registered',
                data : null,
            };
        }

        throw e;
    }
};
