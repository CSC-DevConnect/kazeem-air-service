import HttpRequest from '../utils/httpRequest';
import duffel from '../config/duffel';
import Flight from '../models/flight.model';

const http = new HttpRequest;

const bookFlight = async (body: any): Promise<any> => {
  return Flight.create(body);
};

const createOfferRequest = async (body: any): Promise<any> => {
  const url = `${process.env.DUFFEL_BASE_URL}/offer_requests`;
  const token = process.env.DUFFEL_ACCESS_TOKEN;
  const data = {
    "slices": [
      {
        "origin": "LHR",
        "destination": "JFK",
        "departure_time": {
          "to": "17:00",
          "from": "09:45"
        },
        "departure_date": "2020-04-24",
        "arrival_time": {
          "to": "17:00",
          "from": "09:45"
        }
      }
    ],
    "private_fares": {
      "QF": [
        {
          "corporate_code": "FLX53",
          "tracking_reference": "ABN:2345678"
        }
      ],
      "UA": [
        {
          "corporate_code": "1234"
        }
      ]
    },
    "passengers": [
      {
        "family_name": "Earhart",
        "given_name": "Amelia",
        "loyalty_programme_accounts": [
          {
            "account_number": "12901014",
            "airline_iata_code": "BA"
          }
        ],
        "type": "adult"
      },
      {
        "age": 14
      },
      {
        "fare_type": "student"
      },
      {
        "age": 5,
        "fare_type": "contract_bulk_child"
      }
    ],
    "max_connections": 0,
    "cabin_class": "economy"
  }
  const offers = await http.postRequest(url, data, token);
  return offers;
};

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

const getAirlines = async () => {
  const url = `${process.env.DUFFEL_BASE_URL}/airlines`;
  const token = process.env.DUFFEL_ACCESS_TOKEN;
  const airlines = await http.getRequest(url, token);
  return airlines;
};

const getAirports = async (countryCode?: any) => {
  const url = `${process.env.DUFFEL_BASE_URL}/airports?iata_country_code=${countryCode}`;
  const token = process.env.DUFFEL_ACCESS_TOKEN;
  const airports = await http.getRequest(url, token);
  return airports;
};

const getFlightById = async (id: string) => {
  return Flight.findById(id);
};

export default { bookFlight, getAirlines, getAirports, getFlightById, createOfferRequest, createOffer };
