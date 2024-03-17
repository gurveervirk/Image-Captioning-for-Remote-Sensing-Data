import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import User from "../models/user.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import ApiResponse from "../utils/ApiResponse.js";
import path from "path";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import fetch from "node-fetch";
import { Prediction } from "../models/prediction.models.js";

const options = {
  httpOnly: true,
  secure: true,
};

const generateAccessTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();

    return { accessToken };
  } catch (error) {
    console.log(error);
    throw new ApiError(
      500,
      "Something went wrong while generating access and refresh token. Try again"
    );
  }
};

const registerUser = asyncHandler(async (req, res) => {
  const { fullName, username, email, password } = req.body;

  if (
    [fullName, username, email, password].some((field) => {
      field?.trim() === "";
    })
  ) {
    throw new ApiError(400, "Please fill in all fields");
  }

  const existingUser = await User.findOne({
    $or: [{ username }, { email }],
  });
  if (existingUser) {
    new ApiError(409, "User already exists");
  }
  const user = await User.create({
    fullName,
    username: username.toLowerCase(),
    email,
    password,
  });

  const createUser = await User.findById(user._id).select("-password");
  if (!createUser) {
    throw new ApiError(500, "User not created");
  }

  res
    .status(201)
    .json(new ApiResponse(201, createUser, "User created successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username && !email) {
    throw new ApiError(400, "Username or email is required");
  }

  const user = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (!user) {
    throw new ApiError(404, "User does not exist");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid Password");
  }

  const { accessToken } = await generateAccessTokens(user._id);
  const loggedInUser = await User.findById(user._id).select("-password");
  const response = res
    .status(200)
    .cookie("accessToken", accessToken, {
      httpOnly: true,
      sameSite: "None", // Allows the cookie to be sent with cross-site requests
      path: "/",
      maxAge: 3600000, // 1 hour
    })
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
        },
        "User logged in successfully"
      )
    );
  return response;
});

const logoutUser = asyncHandler(async (req, res) => {
  const uid = req.user._id;

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .json(new ApiResponse(200, {}, "User logged out successfully"));
});

const changeCurrentPassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword) {
    throw new ApiError(400, "Old password and new password is required");
  }
  const user = await User.findById(req.user?._id);
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  const isValidPassword = await user.isPasswordCorrect(oldPassword);

  if (!isValidPassword) {
    throw new ApiError(401, "Invalid Password");
  }

  user.password = newPassword;
  await user.save({ validateBeforeSave: false });
  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password changed successfully"));
});

const getCurrentUser = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, req.user, "User details fetched successfully"));
});

const updateAccountDetails = asyncHandler(async (req, res) => {
  const { fullName, email } = req.body;

  if (!fullName || !email) {
    throw new ApiError(400, "Full name or email is required");
  }
  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        fullName,
        email,
      },
    },
    {
      new: true,
    }
  ).select("-password");

  return res
    .status(200)
    .json(new ApiResponse(200, user, "User details updated successfully"));
});

const predictCaption = asyncHandler(async (req, res) => {
  const imageLocalPath = req.file?.path;
  if (!imageLocalPath) {
    throw new ApiError(400, "Image is required");
  }

  const fullPath = path.resolve(imageLocalPath);
  console.log(JSON.stringify({ imagePath: fullPath }));

  const response = await fetch("http://127.0.0.1:9000/caption", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ imagePath: fullPath }),
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json(); // Extract JSON from the response
  const caption = await data.caption; // Assuming the response JSON has a 'caption' field

  const image = await uploadOnCloudinary(imageLocalPath);

  if (!image.url) {
    throw new ApiError(
      500,
      "Something went wrong while uploading to Cloudinary while updating "
    );
  }
  const prediction = await Prediction.create({
    image: image.url,
    caption: caption,
  });
  if (!prediction) {
    throw new ApiError(500, "Prediction not created");
  }
  await prediction.save();

  const user = await User.findById(req.user?._id);

  if (!user) {
    throw new ApiError(404, "User not found");
  }
  await user.history.push(prediction._id);
  await user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse(200, prediction, "Prediction created successfully"));
});

const getHistory = asyncHandler(async (req, res) => {
  // Find the user by their ID and select only the 'history' field
  const user = await User.findById(req.user?._id).select("history");

  // Fetch the Prediction documents associated with the user's history
  const predictions = await Prediction.find({
    _id: { $in: user.history },
  }).select("image caption");

  // Map the predictions to include only the image URL and caption
  const history = predictions.map((prediction) => ({
    imageUrl: prediction.image,
    caption: prediction.caption,
  }));

  console.log(history);

  return res.status(200).json(
    new ApiResponse(
      200,
      history, // Send the history with image URLs and captions
      "History fetched successfully"
    )
  );
});

export {
  registerUser,
  loginUser,
  logoutUser,
  changeCurrentPassword,
  getCurrentUser,
  updateAccountDetails,
  getHistory,
  predictCaption,
};
