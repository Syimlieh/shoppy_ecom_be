import mongoose from "mongoose";
import { logger } from "../log/logger.js";
import Products from "../models/product.model.js";
import { ProductsJson } from "../utils/seeding/products.js";

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", true);

    // this will be our connection string. we are getting it from our .env
    const MONGO_URI = process.env.MONGO_URI;
    if (!MONGO_URI) {
      throw new Error("MongoDB connection string not provided");
    }
    logger.info("Connecting to Database...");
    await mongoose.connect(MONGO_URI, {
      authSource: "admin",
    });

    mongoose.connection.on('connected', () => {
      logger.info('MongoDB connected');
    });

    logger.info("Connected to Database");

    // Seeding some dummy data for our list of products as in the docs it is not mentioned to add products
    const checkUserExist = await Products.findOne({});
    if (!checkUserExist) {
      const addExist = await Products.insertMany(ProductsJson)
      if (addExist.length) {
        logger.info("Products seeded successfully")
      }
    }
  } catch (err) {
    logger.error("Failed to connect to Database:\n" + err);
    throw err;
  }
};

export default connectDB;
