import httpStatus from 'http-status';
import { Response, Request } from 'express';
import catchAsync from '../utils/catchAsync';
import { flightService } from '../services';

const bookFlight = catchAsync(async (req: Request, res: Response) => {
  const flight = await flightService.bookFlight(req.body);
  res.status(httpStatus.CREATED).send({ flight });
});

const getAirlines = catchAsync(async (req: Request, res: Response) => {
  const result = await flightService.getAirlines();
  res.send(result);
});

const getFlight = catchAsync(async (req: Request, res: Response) => {
  const flight = await flightService.getFlightById(req.params.flightId);
  if (!flight) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Flight not found');
  }
  res.send(flight);
});

export default { bookFlight, getAirlines, getFlight };
