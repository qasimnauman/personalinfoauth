import { asyncHandler } from "../utils/AsyncHandler.js"
import { Apierror } from "../utils/ApiError.js";
import { User } from "../models/user.model.js"
import { Apiresponse } from "../utils/Apiresponse.js"

const generateRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId)

        if (!user) {
            throw new Apierror(404, "User not found");
        }
        const generatedAccessToken = user.generateAccessToken()
        // const generatedRefreshToken = user.generateRefreshToken()

        // console.log("Access", generatedAccessToken, "\nRefresh", generatedRefreshToken);

        // user.refreshToken = generatedRefreshToken
        await user.save({
            validateBeforeSave: false,
        })

        return { generatedAccessToken }
    } catch (error) {
        // console.error("Token Generation Error:", error.message);
        throw new Apierror(500, "Something went wrong while generating refresh and access token")
    }
}

const registerUser = asyncHandler(
    async (req, res) => {
        // Take input from frontend
        // validation - empty or not
        // check if user alredy exist - based on email and username
        // check for images, check for avatar
        // upload them to cloudinary
        // create user object - create entry in db
        // remove password and refresh token feild from response
        // check for user creation based on response
        // return response
        const {
            username,
            email,
            password
        } = req.body

        console.log(req.body);

        if (
            [email, username, password].some((field) => field?.trim() === "")
        ) {
            throw new Apierror(
                400, "All Fields are Required"
            )
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            throw new Apierror(400, "Invalid Email");
        }

        const existeduser = await User.findOne({
            $or: [{ username }, { email }]
        })

        if (existeduser) {
            throw new Apierror(409, `User with UserName: ${username} or Email: ${email} already exist`)
        }

        const user = await User.create({
            username: username.toLowerCase(),
            email,
            password,
        });
        console.log(user);

        const createdUser = await User.findById(user._id).select(
            "-password"
        )

        if (!createdUser) {
            throw new Apierror(500, "Something went wrong while registeing User")
        }

        console.log("Created User", createdUser);

        return res.status(201).json(
            new Apiresponse(200, createdUser, "User created successfully")
        )
    }
);

const loginUser = asyncHandler(
    async (req, res) => {
        // Enter UserName/Email and Password from User
        // Check for the Credentials in the DB
        // If Any Credential is not correct then throw error
        // If Found then set the access the token and refresh token
        // Return the User with the access token and refresh token in the form of secure cookies

        const { username, password, email } = req.body

        if ([username, password, email].some((field) => field?.trim() === "")) {
            throw new Apierror(400, "Username/Email and Password are required")
        }

        const user = await User.findOne({
            $or: [{ username }, { email }]
        })
        // console.log("User Check ", user);

        if (!user) {
            throw new Apierror(404, "User is not registered")
        }

        const passwordcheck = await user.isPasswordCorrect(password);

        if (!passwordcheck) {
            throw new Apierror(401, "Invalid User Credentials\nPassword is not correct")
        }

        const { generatedAccessToken } = await generateRefreshToken(user._id);

        // console.log("Access", generatedAccessToken, "Refresh", generatedRefreshToken);

        const loggedInUser = await User.findById(user._id).select(
            "-password"
        )

        const options = {
            httpOnly: true,
            // maxAge: 24 * 60 * 60 * 1000,
            secure: true,
        }

        return res.status(200)
            .cookie("accessToken", generatedAccessToken, options)
            .json(
                new Apiresponse(
                    200,
                    {
                        user: loggedInUser, generatedAccessToken
                    },
                    "User logged in successfully"
                )
            )
    }
);

const logoutUser = asyncHandler(
    async (req, res) => {
        // console.log("\n\n Logout User \n\n");
        // Clear Refresh Token
        // Clear Cookies

        if (!req.user) {
            return res.status(400).json(new Apiresponse(400, {}, "No user is logged in"));
        }

        // await User.findByIdAndUpdate(
        //     req.user._id,
        //     {
        //         $unset: {
        //             refreshToken: 1 
        //         }
        //     },
        //     {
        //         new: true
        //     }
        // );

        const Options = {
            httpOnly: true,
            secure: true,
            maxAge: 0
        }

        return res.status(200)
            .cookie("accessToken", "", Options)
            .json(
                new Apiresponse(
                    200, {}, "User Logged Out"
                )
            )
    }
);

const testroute = asyncHandler(
    async (req, res) => {
        return res.status(200).json(
            new Apiresponse(200, {}, "Test Route is working")
        )
    }
);

export {
    registerUser,
    loginUser,
    logoutUser,
    testroute
}