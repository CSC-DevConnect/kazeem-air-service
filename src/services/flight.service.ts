import Flight from '../models/flight.model';

const bookFlight = async (body: any): Promise<any> => {
  return Flight.create(body);
};

const queryFlights = async (filter, options) => {
  const flights = await Flight.find({});
  return flights;
};

export default { bookFlight, queryFlights };
