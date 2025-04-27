import express from "express";
import { getAllProducts, getProductById } from "../controllers/product.controller.js";
import validator from "../validations/validator.js";

const router = express.Router();

// first here is the routes, then we add a validation middleware and then go to our routes handler which is our controller
router.get("/", getAllProducts);

// here we will validate object id so that it only accept Mongo Object Id 
// true here mean we are validating the req params
router.get("/:id", validator("validateObjectId", true), getProductById);

export default router;