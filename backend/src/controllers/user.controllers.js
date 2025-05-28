import { asyncHandler } from "../utils/AsyncHandler.js"
import { Apierror } from "../utils/ApiError.js";
import { User } from "../models/user.model.js"
import { Apiresponse } from "../utils/ApiResponse.js"

const getAllUser = asyncHandler(
    async (req, res) => {
        const users = await User.find().sort({ createdAt: -1 });

        if (!users || users.length === 0) {
            throw new Apierror(404, "No Users found");
        }

        return res.status(200).json(
            new Apiresponse(200, users, "Users fetched successfully")
        );
    }
);

const getUserbyId = asyncHandler(
    async (req, res) => {
        const { id } = req.params;

        if (!id) {
            throw new Apierror(400, "User id is required");
        }

        const user = await User.findById(id);

        if (!user) {
            throw new Apierror(404, "User not found");
        }

        return res.status(200).json(
            new Apiresponse(200, user, `User with ${user.username} fetched successfully`)
        );
    }
);

const addUser = asyncHandler(
    async (req, res) => {
        const { username, email, password } = req.body;

        if ([username, email, password].some((field) => field?.trim() === "")) {
            throw new Apierror(400, "All fields are required");
        }

        const existedUser = await User.findOne({ email });

        if (existedUser) {
            throw new Apierror(400, `User with email: ${email} already exists`);
        }

        const newuser = await User.create({ username, email, password });

        if (!newuser) {
            throw new Apierror(500, "Failed to create new user");
        }

        return res.status(201).json(
            new Apiresponse(201, newuser, "New user created successfully")
        );
    }
);

const deleteUser = asyncHandler(
    async (req, res) => {
        const { id } = req.params;

        if (!id) {
            throw new Apierror(400, "User id is required");
        }

        const deleteduser = await User.findByIdAndDelete(id);

        if (!deleteduser) {
            throw new Apierror(404, "User not found");
        }

        return res.status(200).json(
            new Apiresponse(200, null, `User with id: ${id} deleted successfully`)
        );
    }
)

export {
    getAllUser,
    getUserbyId,
    addUser,
    deleteUser
}
