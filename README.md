Description: This is a basic RESTful API built with Node.js, Express, Mongodb with mongoose and Joi for input validation. It supports fetching products, carts functionality and signup and signin.

Make sure that node.js and mongo is installed in local system
Setup:
    Clone the repository:  https://github.com/Syimlieh/shoppy_ecom_be
    Go to the cloned directory and run " npm install "
    Start the application by running: " npm run dev "


API Base URL: http://localhost:4000


Available Endpoints
    Auth
    POST /signup - Signup new user and add to db

    POST /login  - Login new user and generate token on successfull login

    POST /me  - Will get the user detail based on token


    Products
    GET /products - Getting list of produts

    GET /products/:id - Getting product details


    Cart
    POST /cart - Add new item to cart

    PUT /cart/:id - Update cart count

    DELETE /cart/:id - Remove item from cart
    