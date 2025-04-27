import ProductRoutes from "./routes/product.routes.js";

import AuthRoutes from "./routes/auth.routes.js";

import CartRoutes from "./routes/cart.routes.js";

// getting ther server from our server.js
export default (server) => {
    // we are prefix the routes with auth for signin and signup
    server.use("/auth", AuthRoutes);

    // for products we are prefixing with products
    server.use("/products", ProductRoutes);

    // cart Routes
    server.use("/cart", CartRoutes);
};
