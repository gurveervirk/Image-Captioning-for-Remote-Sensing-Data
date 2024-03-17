import dotenv from "dotenv";
dotenv.config({ path: ".env" });
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { limit } from './constants.js';
import userRoute from "./routes/user.routes.js";

const app = express();

// Configure CORS
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}));

// Configure body parsers
app.use(express.json({ limit: limit })); // Use Express's built-in JSON parser
app.use(express.urlencoded({ limit: limit, extended: true })); // Use Express's built-in URL-encoded parser

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Parse cookies
app.use(cookieParser());

// Routes
app.use("/api/v1/users", userRoute);

export default app;
