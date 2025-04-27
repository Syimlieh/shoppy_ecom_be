// I personally like to do this in controller instead of destructure each function because i sometimes use the same name for both controller and service. this allow me to reuse the name without any issue
import * as AuthService from "../services/auth.service.js";

// purpose of controller is to handle the routes so i moved the logic to service and input validation seperately as a middeware
// POST /signup
export const signUp = async (req, res, next) => {
    try {
        const payload = req.body;
        const response = await AuthService.signUp(payload);
        return res.status(response.statusCode).json(response);
    } catch (err) {
        // we can return response here to but i prefer to handle it from the global error handler
        next(err);
    }
};

// POST /login
export const login = async (req, res, next) => {
    try {
        const payload = req.body;
        const response = await AuthService.login(payload);
        return res.status(response.statusCode).json(response);
    } catch (err) {
        next(err);
    }
};


// getting user profile based on logged in details from token
export const getMyProfile = async (req, res, next) => {
    try {
        return res.status(200).json(req.user);
    } catch (err) {
        next(err);
    }
};
