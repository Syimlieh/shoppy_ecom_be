import * as ProductService from "../services/product.service.js";

// GET /products
export const getAllProducts = async (req, res, next) => {
    try {
        const response = await ProductService.getProducts();
        return res.status(response.statusCode).json(response);
    } catch (err) {
        // this error is passed to our error handler. 
        next(err);
        // another option is by directly returned the res here too. this works too 
    }
};

// GET /products/:id
export const getProductById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const response = await ProductService.getProduct(id);
        return res.status(response.statusCode).json(response);
    } catch (err) {
        next(err);
    }
};
