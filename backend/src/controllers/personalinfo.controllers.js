import { asyncHandler } from "../utils/AsyncHandler.js"
import { Apierror } from "../utils/ApiError.js";
import { PersonalInfo } from "../models/personalinfo.model.js";
import { Apiresponse } from "../utils/Apiresponse.js"

const getPersonalInfo = asyncHandler(
    async (req, res) => {
        const personalInfo = await PersonalInfo.find({ user: req.user._id });

        if (!personalInfo) {
            throw new Apierror(404, "Personal information not found");
        }

        res.status(200)
            .json(new Apiresponse(
                200,
                personalInfo,
                `Personal information retrieved successfully for ${req.user.username}`
            ));
    }
)

const addPersonalInfo = asyncHandler(
    async (req, res) => {
        const {
            firstname,
            lastname,
            address,
            phone
        } = req.body;

        if (
            [firstname, lastname, address, phone].some((feild) => feild?.trim() === "")
        ) {
            throw new Apierror(
                400, "All Feilds are required"
            )
        }

        const personalInfo = await PersonalInfo.create(
            {
                user: req.user._id,
                firstname,
                lastname,
                address,
                phone
            }
        );

        console.log(personalInfo);

        if (!personalInfo) {
            throw new Apierror(500, "Failed to add personal information");
        }

        res.status(201)
            .json(new Apiresponse(
                201,
                personalInfo,
                `Personal information added successfully for ${req.user.username}`
            ));
    }
);

const updatePersonalInfo = asyncHandler(
    async (req, res) => {
        const {
            firstname,
            lastname,
            address,
            phone
        } = req.body;

        if (
            [firstname, lastname, address, phone].some((feild) => feild?.trim() === "")
        ) {
            throw new Apierror(
                400, "All Feilds are required"
            )
        }

        const updatedPersonalInfo = await PersonalInfo.findOneAndUpdate(
            { user: req.user._id },
            {
                firstname,
                lastname,
                address,
                phone
            },
            { new: true, runValidators: true }
        );

        if (!updatedPersonalInfo) {
            throw new Apierror(404, "Personal information not found or update failed");
        }

        res.status(200)
            .json(
                new Apiresponse(
                    200,
                    updatePersonalInfo,
                    `Personal Info Updated for ${req.user.username}`
                )
            )
    }
);

const updateUserdata = asyncHandler(
    async (req, res) => {
        const {
            firstname,
            lastname,
            address,
            phone
        } = req.body;

        const id = req.parms;

        if (!id) {
            throw new Apierror(400, "User ID is required");
        }

        if (
            [firstname, lastname, address, phone].some((feild) => feild?.trim() === "")
        ) {
            throw new Apierror(
                400, "All Feilds are required"
            )
        }

        const updatedPersonalInfo = await PersonalInfo.findOneAndUpdate(
            { user: id._id },
            {
                firstname,
                lastname,
                address,
                phone
            },
            { new: true, runValidators: true }
        );

        if (!updatedPersonalInfo) {
            throw new Apierror(404, "Personal information not found or update failed");
        }

        res.status(200)
            .json(
                new Apiresponse(
                    200,
                    updatedPersonalInfo,
                    `Personal Info Updated for ${req.user.username}`
                )
            )
    }
);

const deletePersonalInfo = asyncHandler(
    async (req, res) => {
        const personalInfo = await PersonalInfo.findOneAndDelete({ user: req.user._id });

        if (!personalInfo) {
            throw new Apierror(404, "Personal information not found");
        }

        res.status(200)
            .json(new Apiresponse(
                200,
                null,
                `Personal information deleted successfully for ${req.user.username}`
            ));
    }
);

export {
    getPersonalInfo,
    addPersonalInfo,
    updatePersonalInfo,
    updateUserdata,
    deletePersonalInfo
}