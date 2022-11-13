import HttpRequest from '../utils/httpRequest';
import duffel from '../config/duffel';

/*
|-----------------------------------------------------------------------
| HttpRequest Instance
|------------------------------------------------------------------------
*/
const http = new HttpRequest();

/*
|-----------------------------------------------------------------------
| Create one way offer request
|------------------------------------------------------------------------
*/
const createOfferRequest = async (body: any): Promise<any> => {
  const { cabin_class, origin, destination, departure_date } = body;
  const payload: any = {
    return_offers: false,
    supplier_timeout: 20000,
    slices: [
      {
        origin,
        destination,
        departure_date,
      },
    ],
    passengers: [{ type: 'adult' }],
    cabin_class,
  };

  const offerRequest = await duffel.offerRequests.create(payload);
  const url = `${process.env.DUFFEL_BASE_URL}/offer_requests/${offerRequest.data.id}`;
  const token = process.env.DUFFEL_ACCESS_TOKEN;
  const offers = await http.getRequest(url, token);

  return offers.data.offers.slice(0, 5);
};

/*
|-----------------------------------------------------------------------
| Create two way offer request
|------------------------------------------------------------------------
*/
const createTwoWayOfferRequest = async (body: any): Promise<any> => {
  const { cabin_class, origin, destination, departure_date, return_origin, return_destination, return_departure_date } =
    body;
  const payload: any = {
    return_offers: false,
    supplier_timeout: 20000,
    slices: [
      {
        origin,
        destination,
        departure_date,
      },
      {
        origin: return_origin,
        destination: return_destination,
        departure_date: return_departure_date,
      },
    ],
    passengers: [{ type: 'adult' }],
    cabin_class,
  };

  const offerRequest = await duffel.offerRequests.create(payload);
  const url = `${process.env.DUFFEL_BASE_URL}/offer_requests/${offerRequest.data.id}`;
  const token = process.env.DUFFEL_ACCESS_TOKEN;
  const offers = await http.getRequest(url, token);

  return offers.data.offers.slice(0, 5);
};

/*
|-----------------------------------------------------------------------
| List offer requests
|------------------------------------------------------------------------
*/
const getOfferRequests = async () => {
  const url = `${process.env.DUFFEL_BASE_URL}/offer_requests`;
  const token = process.env.DUFFEL_ACCESS_TOKEN;
  const offerRequests = await http.getRequest(url, token);
  return offerRequests;
};

/*
|-----------------------------------------------------------------------
| Get all airlines
|------------------------------------------------------------------------
*/
const createOffer = async (body) => {
  duffel.orders.create({
    selected_offers: ['off_0000APUJxQEqcjioVjvAPc'],
    payments: [
      {
        type: 'balance',
        currency: 'USD',
        amount: '566.64',
      },
    ],
    passengers: [
      {
        phone_number: '+44 2080160508',
        email: 'mae@example.com',
        born_on: '1956-10-17',
        title: 'ms',
        gender: 'f',
        family_name: 'Jemison',
        given_name: 'Mae',
        id: 'pas_0000APUJxQ0fTSNZnlHqJS',
      },
    ],
    type: 'instant',
  });
};

/*
|-----------------------------------------------------------------------
| Get all airlines
|------------------------------------------------------------------------
*/
const getAirlines = async () => {
  const url = `${process.env.DUFFEL_BASE_URL}/airlines`;
  const token = process.env.DUFFEL_ACCESS_TOKEN;
  const airlines = await http.getRequest(url, token);
  return airlines;
};

/*
|-----------------------------------------------------------------------
| Get all airlines
|------------------------------------------------------------------------
*/
const getAirports = async (countryCode?: any) => {
  const url = `${process.env.DUFFEL_BASE_URL}/airports?iata_country_code=${countryCode}`;
  const token = process.env.DUFFEL_ACCESS_TOKEN;
  const airports = await http.getRequest(url, token);
  return airports;
};

/*  
|-----------------------------------------------------------------------
| Create an order
|------------------------------------------------------------------------
*/

const createOrder = async (body, selected_offers, passenger_id) => {
  const { type, phone_number, email, born_on, title, gender, family_name, given_name } = body;

  const payload: any = {
    selected_offers: [selected_offers],
    payments: [
      {
        type: 'balance',
        currency: 'USD',
        amount: '299.96',
      },
    ],
    passengers: [
      {
        phone_number,
        email,
        born_on,
        title,
        gender,
        family_name,
        given_name,
        id: passenger_id,
      },
    ],
    type,
  };
  try {
    const order = await duffel.orders.create(payload);
    if (!order) {
      throw new Error('Invalid request');
    }
    return order;
  } catch (error: any) {
    console.log( error.errors[0] );
    throw new Error(error.errors[0].message);
  }
};

/*  
|-----------------------------------------------------------------------
| List orders
|------------------------------------------------------------------------
*/
const getOrders = async () => {
  const url = `${process.env.DUFFEL_BASE_URL}/orders`;
  const token = process.env.DUFFEL_ACCESS_TOKEN;

  const orders = await http.getRequest(url, token);
  return orders;
};

/*  
|-----------------------------------------------------------------------
| Get a single order
|------------------------------------------------------------------------
*/

const getOrder = async (id) => {
  const url = `${process.env.DUFFEL_BASE_URL}/orders/${id}`;
  const token = process.env.DUFFEL_ACCESS_TOKEN;

  const order = await http.getRequest(url, token);
  return order;
};

/*  
|-----------------------------------------------------------------------
| Update a single order
|------------------------------------------------------------------------
*/

const updateOrder = async (id, body) => {
  const order = await getOrder(id);

  const r = Object.assign(order, body);
  console.log('order', order);
  console.log('result', r);
  await order.save();
  return order;
};

export default {
  getAirlines,
  getAirports,
  createOfferRequest,
  createOffer,
  createOrder,
  getOrders,
  getOrder,
  updateOrder,
  createTwoWayOfferRequest,
  getOfferRequests,
};
