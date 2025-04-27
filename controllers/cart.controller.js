import * as CartService from "../services/cart.service.js";

// POST /cart
export const addToCart = async (req, res, next) => {
    try {
        const user = req.user;
        const payload = req.body;

        // add the logged in user to userId
        payload.userId = user._id;
        const response = await CartService.createCart(payload);
        return res.status(response.statusCode).json(response);
    } catch (err) {
        // this error is passed to our error handler. 
        next(err);
        // another option is by directly returned the res here too. this works too 
    }
};

// Put /cart/:id
export const updateCart = async (req, res, next) => {
    try {
        const { id } = req.params;
        const payload = req.body;

        const response = await CartService.updateCart(id, payload);
        return res.status(response.statusCode).json(response);
    } catch (err) {
        // this error is passed to our error handler. 
        next(err);
        // another option is by directly returned the res here too. this works too 
    }
};

// Delete /cart/:id
export const removeCart = async (req, res, next) => {
    try {
        const { id } = req.params;
        const response = await CartService.removeCart(id);
        return res.status(response.statusCode).json(response);
    } catch (err) {
        // this error is passed to our error handler. 
        next(err);
        // another option is by directly returned the res here too. this works too 
    }
};
