import mongoose from 'mongoose';
import validator from 'validator';

interface FlightDoc extends Document {
  from: string;
  to: string;
  date: string;
  airline: string;
//   group: string;
//   passengerCount: number;
//   passengers: string[];
  price: number;
}

const flightSchema = new mongoose.Schema<FlightDoc>({
  from: {
    type: String,
    required: true,
    trim: true,
  },
  to: {
    type: String,
    required: true,
    trim: true,
  },
  date: {
    type: String,
    required: true,
    trim: true,
  },
  airline: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: String,
    required: true,
    trim: true,
  },
});

/**
 * @typedef Flight
 */
const Flight = mongoose.model('Flight', flightSchema);

export default Flight;
