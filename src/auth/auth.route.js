import express from "express";
import { login, register, changePassword } from "./auth.controller.js";
import { protect, restrictTo } from "./auth.middleware.js";

export const router = express.Router();

router.post("/login", login);

router.post("/register", protect, restrictTo("developer"), register);

router.patch("/change-password", protect, changePassword);
