// Verifies if the user is logged in or not

import jwt from "jsonwebtoken";
import { Apierror } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { User } from "../models/user.model.js";

export const verifyJWT = asyncHandler(async (req, _, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization");
        console.log("Token from cookies or header:", token);

        if (!token) throw new Apierror(401, "Unauthorized: Token is missing");


        console.log("Verifying token:", token);
        console.log("Before deconde")
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        const user = await User.findById(decodedToken?._id).select("-password")
        console.log("After decode", user)
        if (!user) {
            throw new Apierror(401, "Invalid Access Token")
        }

        req.user = user;
        next()
    } catch (error) {
        throw new Apierror(401, error?.message || "Invalid access token")
    }

})