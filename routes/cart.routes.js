import express from "express";
import { addToCart, removeCart, updateCart } from "../controllers/cart.controller.js";
import validator from "../validations/validator.js";
import authMiddleware from "../middlewares/authentication.middleware.js";

const router = express.Router();

// first here is the routes, then we add a validation middleware and then go to our routes handler which is our controller
router.post("/", authMiddleware, validator("validateAddToCart"), addToCart);

router.put("/:id", authMiddleware, validator("validateObjectId", true), validator("validateUpdateCart"), updateCart);

router.delete(
    "/:id",
    authMiddleware,
    validator("validateObjectId", true),
    removeCart
);

export default router;