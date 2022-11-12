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
  const { cabin_class, origin, destination, departure_date, return_origin, return_destination, return_departure_date } = body;
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

export default { getAirlines, getAirports, createOfferRequest, createTwoWayOfferRequest, getOfferRequests, createOffer };
