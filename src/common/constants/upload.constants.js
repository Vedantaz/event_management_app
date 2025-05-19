"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Messages = void 0;
exports.Messages = {
    USER: {
        CREATED: "User has been created successfully.",
        UPDATED: "User details updated successfully.",
        DELETED: "User deleted successfully.",
        NOT_FOUND: "User not found.",
        INVALID_USERID: "Invalid user ID",
    },
    AUTH: {
        LOGIN_SUCCESS: "Login successful.",
        LOGIN_FAILED: "Invalid credentials.",
        UNAUTHORIZED: "Unauthorized: Invalid token",
        EMAIL: "Email already exists.",
    },
    COMMON: {
        INTERNAL_SERVER_ERROR: "Something went wrong. Please try again later.",
    },
    FILTER: "Only JPEG and PNG files are allowed",
    UPDATED_PROFILE: "Profile picture updated successfully",
    FILE_FORMAT: "Invalid file format. Please upload JPEG or PNG images only.",
    BASE64_FILENAME: "Base64 string and filename are required.",
    FILE_NOT_FOUND: "FIle not found",
    ERROR: "Error saving file",
    statuscode_ERROR: 500,
    Unauthorized: 401,
    BAD_REQUEST: 400,
    imageUrl: "http://localhost:3000/upload/getProfile/",
    NOT_FOUND: 404,
    OK: 200,
    GETPROFILE_IMAGEURL: "http://localhost:3000/upload/getProfile/",
    INVALID_FILETYPE: "Invalid file upload. Please provide a valid file",
    IMAGE_FAILED_TO_SAVE: "The Image failed to save.",
    IMAGE_FAILED_TO_SAVE_IN_FOLDER: "The Image failed to save in folder.",
    UPLOAD_FILE_FAILED: "Uploading the file failed.",
    PROFILE_UPLOADED: "The profile is uploaded !",
    PROFILE_UPDATED: "The profile is updated !",
    SERVER_ERROR: "Internal server error",
    GET_PROFILE_WITH_FILENAME: "Get profile with filename",
    UPDATE_PROFILE_PIC: "Update profile picture",
    PROFILE_CREATED: "Profile picture created.",
};
