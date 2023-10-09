import { Router } from "express";

import {
  createFlight,
  deleteFlight,
  findAllFligths,
  findOneFlight,
  updateFlight,
} from "./flight.controller.js";

import { validateExistFlight } from "./flight.middleware.js";

export const router = Router();

router.route("/").get(findAllFligths).post(createFlight);

router
  .route("/:id")
  .get(validateExistFlight, findOneFlight)
  .patch(validateExistFlight, updateFlight)
  .delete(validateExistFlight, deleteFlight);
