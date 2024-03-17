import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import User from "../models/user.models.js";
import jwt from "jsonwebtoken";

export const verifyJWT = asyncHandler(async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken || req.header("Authorization")?.split(" ")[1];
    if (!token) {
      throw new ApiError(401, "Unauthorized");
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    if (!decodedToken) {
      throw new ApiError(401, "Unauthorized JWT Token");
    }

    const user = await User.findById(decodedToken?._id).select("-password");

    if (!user) {
      throw new ApiError(401, "Unauthorized User" + `${token}`);
    }

    req.user = user;
    next();
  } catch (error) {
    const serializedError = JSON.stringify(
      error,
      Object.getOwnPropertyNames(error)
    );
    throw new ApiError(401, serializedError || "Unauthorized JWT Token");
  }
});
