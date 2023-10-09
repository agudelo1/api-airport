import { Router } from "express";
import {
  createPassenger,
  deletePassenger,
  findAllPassengers,
  findOnePassenger,
  updatePassenger,
} from "./passengers.controller.js";

export const router = Router();

router.route("/").get(findAllPassengers).post(createPassenger);

router
  .route("/:id")
  .get(findOnePassenger)
  .patch(updatePassenger)
  .delete(deletePassenger);
