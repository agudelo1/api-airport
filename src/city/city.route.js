import { Router } from "express";
import {
  createCity,
  findAllCities,
  deleteCity,
  findOneCity,
  updateCity,
} from "./city.controller.js";

import { validateExistCity } from "./city.middleware.js";

export const router = Router();

router.route("/").get(findAllCities).post(createCity);

router
  .route("/:id")
  .get(validateExistCity, findOneCity)
  .patch(validateExistCity, updateCity)
  .delete(validateExistCity, deleteCity);
