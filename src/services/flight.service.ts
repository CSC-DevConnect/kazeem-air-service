import HttpRequest from '../utils/httpRequest';
import duffel from '../config/duffel';

/*
|-----------------------------------------------------------------------
| HttpRequest Instance
|------------------------------------------------------------------------
*/
const http = new HttpRequest;

/*
|-----------------------------------------------------------------------
| Get all airlines
|------------------------------------------------------------------------
*/
const createOfferRequest = async (body: any): Promise<any> => {
  const url = `${process.env.DUFFEL_BASE_URL}/offer_requests`;
  const token = process.env.DUFFEL_ACCESS_TOKEN;
  const data = {
    "slices": [
      {
        "origin": 'LHR',
        "destination": 'JFK',
        "departure_date": "2023-05-12T14:59:49.547Z"
      },
      {
        "origin": 'JFK',
        "destination": 'LHR',
        "departure_date": "2023-05-20T14:59:49.547Z"
      },
    ],
    "passengers": [{ "type": "adult" }],
    "cabin_class": null
  }

  const offers = await http.postRequest(url, data, token);
  // const offerRequest = await duffel.offerRequests.create({
  //   "slices": [
  //     {
  //       "origin": 'LHR',
  //       "destination": 'JFK',
  //       "departure_date": "2023-05-12T14:59:49.547Z"
  //     },
  //     {
  //       "origin": 'JFK',
  //       "destination": 'LHR',
  //       "departure_date": "2023-05-20T14:59:49.547Z"
  //     },
  //   ],
  //   "passengers": [{ "type": "adult" }],
  //   "cabin_class": null
  // })
  
  // const offers = await duffel.offers.list()
  return offers;
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

export default { getAirlines, getAirports, createOfferRequest, createOffer };
