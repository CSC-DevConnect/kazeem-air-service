import duffel from 'src/config/duffel';
import Flight from '../models/flight.model';

const bookFlight = async (body: any): Promise<any> => {
  return Flight.create(body);
};

const createOfferRequest = async (body: any): Promise<any> => {
  const offerRequest = await duffel.offerRequests.create({
    "slices": [
      {
        "origin": 'LHR',
        "destination": 'JFK',
        "departure_date": "2023-05-11T23:26:26.468Z"
      },
      {
        "origin": 'JFK',
        "destination": 'LHR',
        "departure_date": "2023-05-19T23:26:26.468Z"
      },
    ],
    "passengers": [{ "type": "adult" }],
    "cabin_class": null
  })
  
  const offers = await duffel.offers.list(offerRequest.data.id);

  return offers;
};

const createOffer = async (req: Request, res: Response) => {
  duffel.orders.create({
    "selected_offers": ["off_0000APUJxQEqcjioVjvAPc"],
    "payments": [
      {
        "type": "balance",
        "currency": "USD",
        "amount": "566.64"
      }
    ],
    "passengers": [
      {
        "phone_number": "+44 2080160508",
        "email": "mae@example.com",
        "born_on": "1956-10-17",
        "title": "ms",
        "gender": "f",
        "family_name": "Jemison",
        "given_name": "Mae",
        "id": "pas_0000APUJxQ0fTSNZnlHqJS"
      }
    ],
    "type": "instant"
  })
}

const queryFlights = async (filter, options) => {
  const flights = await Flight.find({});
  return flights;
};

const getFlightById = async (id: string) => {
  return Flight.findById(id);
};

export default { bookFlight, queryFlights, getFlightById, createOfferRequest, createOffer };
