import { Request, Response, NextFunction } from 'express';

import Joi, { ValidationResult } from 'joi';

const nameSchema = Joi.string().min(5).max(50).required().messages({
    'string.base': `Name should be a string`,
    'string.empty': `Name cannot be empty`,
    'string.min': `Name should have a minimum length of {#limit}`,
    'string.max': `Name should have a maximum length of {#limit}`,
    'any.required': `Name is a required field`,
});

const emailSchema = Joi.string().min(5).max(255).email().required().messages({
    'string.base': `Email should be a string`,
    'string.email': `Invalid email format`,
    'any.required': `Email is a required field`,
});

const passwordSchema = Joi.string().min(8).required().messages({
    'string.base': `Password should be a string`,
    'string.empty': `Password cannot be empty`,
    'string.min': `Password should have a minimum length of {#limit}`,
    'any.required': `Password is a required field`,
});

const newUserSchema = Joi.object({
    name: nameSchema,
    email: emailSchema,
    password: passwordSchema,
});

const authUserSchema = Joi.object({
    email: emailSchema,
    password: passwordSchema,
});


const sendValidationErrors = (res: Response, validationResult: ValidationResult<any>): void => {
    const errorMessages = validationResult.error?.details.map(detail => detail.message) || [];
    res.status(400).send(errorMessages);
};


export const validateNewUser = (req: Request, res: Response, next: NextFunction) => {

    const { name, email, password } = req.body;

    const result = newUserSchema.validate({name: name, email: email, password: password})
    
    if (result.error) {
        sendValidationErrors(res, result);

        return;
    }

    next();
}   


export const validateExistingUser = (req: Request, res: Response, next: NextFunction) => {

    const { email, password } = req.body;

    const result = authUserSchema.validate({email: email, password: password})
    
    if (result.error) {
        sendValidationErrors(res, result);

        return;
    }

    next();
}   