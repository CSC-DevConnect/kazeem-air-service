import httpStatus from 'http-status';
import { Response, Request } from 'express';
import catchAsync from '../utils/catchAsync';
import { flightService } from '../services';

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
const createTwoWayOfferRequest = catchAsync(async (req: Request, res: Response) => {
  const flight = await flightService.createTwoWayOfferRequest(req.body);
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

/*
|-----------------------------------------------------------------------
|Create order
|------------------------------------------------------------------------
*/
const createOrder = catchAsync(async (req: Request, res: Response) => {
  const { passenger_id, selected_offers } = req.query;
  const flight = await flightService.createOrder(req.body, selected_offers, passenger_id);
  res.status(httpStatus.CREATED).send({ flight });
});

/*
|-----------------------------------------------------------------------
| List of all orders
|------------------------------------------------------------------------
*/
const getOrders = catchAsync(async (req: Request, res: Response) => {
  const flight = await flightService.getOrders();
  res.status(httpStatus.CREATED).send({ flight });
});

/*
|-----------------------------------------------------------------------
| Get a single order
|------------------------------------------------------------------------
*/
const getOrder = catchAsync(async (req: Request, res: Response) => {
  const flight = await flightService.getOrder(req.params.id);
  res.status(httpStatus.CREATED).send({ flight });
});

/*
|-----------------------------------------------------------------------
| Update a single order
|------------------------------------------------------------------------
*/
const updateOrder = catchAsync(async (req: Request, res: Response) => {
  const flight = await flightService.updateOrder(req.params.id, req.body);
  res.status(httpStatus.CREATED).send({ flight });
});

export default {
  getAirlines,
  getAirports,
  createOfferRequest,
  createOrder,
  getOrders,
  getOrder,
  updateOrder,
  createTwoWayOfferRequest,
  getOfferRequests,
};
