import Joi from 'joi';
import joiObjectId from 'joi-objectid';

Joi.objectId = joiObjectId(Joi);

// creating schema for Joi validation
export const validateCreateUser = Joi.object({
    firstName: Joi.string()
        .trim()
        .required()
        .messages({ // provide a clear and readable message for different scenario
            'string.empty': 'First name is required.',
            'any.required': 'First name is mandatory.',
        }),
    lastName: Joi.string()
        .trim()
        .required()
        .messages({
            'string.empty': 'Last name is required.',
            'any.required': 'Last name is mandatory.',
        }),
    hobby: Joi.array().items(
        Joi.string()
            .trim()
            .required()
    ).required().messages({
        'any.required': 'Hobby is mandatory.',
    }),
});

// all field will be optional but will not allow empty string
export const validateUpdateUser = Joi.object({
    firstName: Joi.string().trim().optional(),
    lastName: Joi.string().trim().optional(),
    hobby: Joi.array().items(
        Joi.string().trim().optional()
    ).optional()
});

// this will validate any id we pass to our req.
// it will only allow this Mongo generated id format :  6804986b0405747f7569d0f9
export const validateObjectId = Joi.object({
    id: Joi.objectId().required().messages({
        'any.required': 'Id is required.',
        'string.pattern.name': 'Id must be a valid mongo id.',
        'string.empty': 'Id cannot be empty.'
    })
});
