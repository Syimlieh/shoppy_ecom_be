import mongoose from "mongoose";
import { COLLECTIONS } from "../utils/constants.js";

// Our product schema
const ProductSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
            trim: true,
        },
        category: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
        },
        price: {
            type: Number,
            required: true,
            min: 0,
        },
        stock: {
            type: Number,
            min: 0,
            default: 0,
        },
        brand: {
            type: String,
            trim: true,
        },
        thumbnail: {
            type: String,
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);

const Products = mongoose.model(COLLECTIONS.PRODUCTS, ProductSchema);

export default Products;