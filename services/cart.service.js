import { logger } from "../log/logger.js";
import Carts from "../models/cart.model.js"
import Products from "../models/product.model.js";
import { STATUS_MESSAGE } from "../utils/constants.js";
import AppError from "../utils/errors/AppError.js";

export const createCart = async (payload) => {
    try {
        const { userId, productId, itemCount } = payload;
        // checking if the product id from the req exist or not
        // this can be done on mogoose schema level too
        const checkProduct = await Products.findById(productId);
        if (!checkProduct) {
            throw new AppError("Product added does not exist.", checkProduct, 404);
        }

        // check if cart already exist to avoid duplicate cart for the same user and product
        const existingCart = await Carts.findOne({ userId, productId });
        if (existingCart) throw new AppError("Cart already exist for this product.", existingCart, 409);

        const newPayload = {
            ...payload,
            // calculate total Price
            totalPrice: itemCount * checkProduct.price,
        }
        const newCart = new Carts(newPayload);
        const savedCart = await newCart.save();
        return {
            statusCode: 201,
            message: "Cart added successfully.",
            data: savedCart,
        };
    } catch (error) {
        logger.error(`Failed while saving Error => ${error.message}`);
        if (error instanceof AppError) throw error;
        throw new AppError(STATUS_MESSAGE[500], error, error.statusCode || 500)
    }
}

export const updateCart = async (id, payload) => {
    try {
        let { itemCount } = payload;

        // if the count is 0 then we need to remove from cart 
        if (itemCount <= 0) {
            const cart = await Carts.findByIdAndDelete(id);
            return {
                statusCode: 200,
                message: "Item removed from cart",
                data: cart,
            };
        }

        // get the cart and populate the price from products
        const cart = await Carts.findById(id).populate("productId", "price");
        if (!cart) {
            throw new AppError("Cart does not exist.", cart, 404);
        }

        const cartPayload = {
            ...payload,
            // re calculate the total price
            totalPrice: itemCount * cart.productId.price,
        };
        // update the final cart
        const updatedCart = await Carts.findByIdAndUpdate(
            id,
            { $set: cartPayload },
            { new: true }
        )

        return {
            statusCode: 200,
            message: "Cart updated successfully",
            data: updatedCart,
        };
    } catch (error) {
        logger.error(`Failed while updating error => ${error.message}`);
        if (error instanceof AppError) throw error;
        throw new AppError(STATUS_MESSAGE[500], error, error.statusCode || 500)
    }
}

// service for removing item from cart
export const removeCart = async (id) => {
    try {
        const removedCart = await Carts.findByIdAndDelete(id);
        if (!removedCart) {
            throw new AppError("Cart does not exist.", removedCart, 404);
        }
        return {
            statusCode: 200,
            message: "Cart removed successfully",
            data: removedCart,
        };
    } catch (error) {
        logger.error(`Failed while deleting Error => ${error.message}`);
        if (error instanceof AppError) throw error;
        throw new AppError(STATUS_MESSAGE[500], error, error.statusCode || 500)
    }
}
