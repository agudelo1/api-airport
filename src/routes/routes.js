import { Router } from "express";
import { router as passengerRouter } from "../passengers/passengers.route.js";
import { router as cityRouter } from "../city/city.route.js";
import { router as authRouter } from "../auth/auth.route.js";
import { router as planeRouter } from "../plane/plane.route.js";
import { router as flightRouter } from "../flight/flight.route.js";

export const router = Router();

router.use("/users", authRouter);

router.use("/passengers", passengerRouter);
router.use("/city", cityRouter);
router.use("/plane", planeRouter);
router.use("/flight", flightRouter);
