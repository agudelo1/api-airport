import { catchAsync } from "../errors/index.js";
import { validateCity, validatePartialCity } from "./city.schema.js";
import { CityService } from "./city.service.js";

const cityService = new CityService();

export const findAllCities = catchAsync(async (req, res) => {
  const cities = await cityService.findAllCities();
  return res.status(200).json(cities);
});

export const createCity = catchAsync(async (req, res) => {
  const { CityData, errorMessages, hasError } = validateCity(req.body);

  if (hasError) {
    return res.status(422).json({
      status: "error",
      message: errorMessages,
    });
  }

  const city = await cityService.createCity(CityData);

  return res.status(201).json(city);
});

export const findOneCity = catchAsync(async (req, res) => {
  const { city } = req;

  return res.status(500).json(city);
});

export const updateCity = catchAsync(async (req, res) => {
  const { city } = req;

  const { dataCity, errorMessages, hasError } = validatePartialCity(req.body);

  if (hasError) {
    return res.status(422).json({
      status: "error",
      message: errorMessages,
    });
  }

  const cityUpdate = await cityService.updateCity(city, dataCity);

  return res.status(200).json(cityUpdate);
});

export const deleteCity = catchAsync(async (req, res) => {
  const { city } = req;

  await cityService.deleteCity(city);
  return res.status(204).json(null);
});
