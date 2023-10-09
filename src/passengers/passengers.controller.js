import { AppError, catchAsync } from "../errors/index.js";
import {
  validatePartialPassenger,
  validatePassenger,
} from "./passengers.schema.js";
import { PassengerService } from "./passengers.service.js";

const passengerService = new PassengerService();

export const findAllPassengers = catchAsync(async (req, res, next) => {
  const passengers = await passengerService.findAllPassengers();
  return res.json(passengers);
});

//createPassenger
export const createPassenger = catchAsync(async (req, res) => {
  const { passengerData, errorMessages, hasError } = validatePassenger(
    req.body
  );

  if (hasError) {
    return res.status(422).json({
      status: "error",
      message: errorMessages,
    });
  }

  const passenger = await passengerService.createPassenger(passengerData);
  return res.status(201).json(passenger);
});

//findOnePassenger

export const findOnePassenger = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const passenger = await passengerService.findOnePassenger(id);

  if (!passenger) {
    return next(new AppError(`Passenger with id: ${id} not found`, 404));
  }

  return res.json(passenger);
});

//updatePassenger

export const updatePassenger = catchAsync(async (req, res) => {
  const { errorMessages, hasError, passengerData } = validatePartialPassenger(
    req.body
  );

  if (hasError) {
    return res.status(422).json({
      status: "error",
      message: errorMessages,
    });
  }

  const { id } = req.params;

  const passenger = await passengerService.findOnePassenger(id);

  if (!passenger) {
    return res.status(404).json({
      status: "error",
      message: `Passenger with id: ${id} not found`,
    });
  }

  const updatePassenger = await passengerService.updatePassenger(
    passenger,
    passengerData
  );

  res.json(updatePassenger);
});

// deletePassenger

export const deletePassenger = catchAsync(async (req, res) => {
  const { id } = req.params;

  const passenger = await passengerService.findOnePassenger(id);

  if (!passenger) {
    return res.status(404).json({
      status: "error",
      message: `Passenger with id: ${id} not found`,
    });
  }

  await passengerService.deletePassenger(passenger);

  res.status(204).json(null);
});
