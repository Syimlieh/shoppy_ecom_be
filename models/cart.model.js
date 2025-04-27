import mongoose from "mongoose";
import { COLLECTIONS } from "../utils/constants.js";

// Carts Schema
const Cartschema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.ObjectId,
            // this will create a reference to our user collection
            ref: COLLECTIONS.USERS,
            required: true,
        },
        productId: {
            type: mongoose.Schema.ObjectId,
            // create reference to our products collection
            ref: COLLECTIONS.PRODUCTS,
            required: true,
        },
        itemCount: {
            type: Number,
            required: true,
            min: [1, 'At least 1 item should be added'],
        },
        totalPrice: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Carts = mongoose.model(COLLECTIONS.CARTS, Cartschema);

export default Carts;