import mongoose from "mongoose";
import { COLLECTIONS } from "../utils/constants.js"

// here we are creating a new mongo schema for our User collection
const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        trim: true,
        required: true,
        lowercase: true,
        unique: true,
    },
    mobile: {
        type: String,
        trim: true,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        trim: true,
        select: false,
        required: true,
    },
    firstName: {
        type: String,
        trim: true,
        required: true,
    },
    lastName: {
        type: String,
        trim: true,
        required: true,
    },
    hobby: [{
        type: String,
        trim: true,
        required: true,
    }]
}, {
    timestamps: true
})

const Users = mongoose.model(COLLECTIONS.USERS, UserSchema);

export default Users;