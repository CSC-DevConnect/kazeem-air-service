import httpStatus from 'http-status';
import { Response, Request } from 'express';
import catchAsync from '../utils/catchAsync';
import { flightService } from '../services';

/*
|-----------------------------------------------------------------------
| Get all airlines
|------------------------------------------------------------------------
*/
// const bookFlight = catchAsync(async (req: Request, res: Response) => {
//   const flight = await flightService.bookFlight(req.body);
//   res.status(httpStatus.CREATED).send({ flight });
// });

/*
|-----------------------------------------------------------------------
| Get all airlines
|------------------------------------------------------------------------
*/
const createOfferRequest = catchAsync(async (req: Request, res: Response) => {
  const flight = await flightService.createOfferRequest(req.body);
  res.status(httpStatus.CREATED).send({ flight });
});

/*
|-----------------------------------------------------------------------
| Get all airlines
|------------------------------------------------------------------------
*/
const getOfferRequests = catchAsync(async (req: Request, res: Response) => {
  const result = await flightService.getOfferRequests();
  res.send(result);
});

/*
|-----------------------------------------------------------------------
| Get all airlines
|------------------------------------------------------------------------
*/
const getAirlines = catchAsync(async (req: Request, res: Response) => {
  const result = await flightService.getAirlines();
  res.send(result);
});

/*
|-----------------------------------------------------------------------
| Get all airlines
|------------------------------------------------------------------------
*/
const getAirports = catchAsync(async (req: Request, res: Response) => {
  const { countryCode } = req.query;
  const result = await flightService.getAirports(countryCode);
  res.send(result);
});


export default { getAirlines, getAirports, createOfferRequest, getOfferRequests };
