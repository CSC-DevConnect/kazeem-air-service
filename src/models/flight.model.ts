import mongoose from 'mongoose';
import validator from 'validator';

interface FlightDoc extends Document {
  from: string;
  to: string;
  date: string;
  airline: string;
  fromTime: string;
  toTime: string;
  user: {
    type: Schema.Types.ObjectId;
    ref: 'User';
  };
  group: string;
  passengerCount: number;
  passengers: string[];
  price: number;
}

const flightSchema = new mongoose.Schema<FlightDoc>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Invalid email');
      }
    },
  },
  isEmailVerified: {
    type: Boolean,
    default: false,
  },
});

/**
 * @typedef Flight
 */
const User = mongoose.model('Flight', flightSchema);

export default User;
