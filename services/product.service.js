import Products from "../models/product.model.js";

import { logger } from "../log/logger.js";
import { STATUS_MESSAGE } from "../utils/constants.js";
import AppError from "../utils/errors/AppError.js";


export const getProducts = async () => {
    try {
        // this is a simple find that fetch all records without any pagination
        const products = await Products.find();
        return {
            statusCode: 200,
            message: 'Products fetch successfully.',
            data: products,
        }
    } catch (error) {
        logger.error(`Failed while fetching Error => ${error.message}`)
        if (error instanceof AppError) throw error;
        throw new AppError(STATUS_MESSAGE[500], error, error.statusCode || 500)
    }
}

export const getProduct = async (id) => {
    try {
        const user = await Products.findById(id);
        if (!user) {
            throw new AppError('Product does not exist.', user, 404)
        }
        return {
            statusCode: 200,
            message: 'Product fetch successfully.',
            data: user,
        }
    } catch (error) {
        logger.error(`Failed while fetching Error => ${error.message}`)
        if (error instanceof AppError) throw error;
        throw new AppError(STATUS_MESSAGE[500], error, error.statusCode || 500)
    }
}

