import Joi from "joi";
import joiObjectId from "joi-objectid";

Joi.objectId = joiObjectId(Joi);

export const validateAddToCart = Joi.object({
    productId: Joi.objectId().required().messages({
        "any.required": "Product id is required.",
        "string.pattern.name": "Product id must be a valid id",
    }),
    itemCount: Joi.number().default(1).min(1).messages({
        "number.min": "Item count must be at least 1"
    }),
});

export const validateUpdateCart = Joi.object({
    itemCount: Joi.number()
        .required()
        .messages({
            "number.min": "Item count must be at least 1",
            "any.required": "Item count is required when updating the cart",
        }),
});
