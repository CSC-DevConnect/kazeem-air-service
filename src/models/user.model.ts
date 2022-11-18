import mongoose, { Model} from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import { toJSON, paginate } from './plugins';
// import roles from '../config/roles';

interface IUser {
  fullName: string;
  email: string;
  password: string;
  country: string;
  phoneNumber: string;
  dateOfBirth: string;
  gender: string;
  isEmailVerified: boolean;
}

// interface IUser {
//   username: string;
//   hashedPassword: string;
// }

interface IUserDocument extends IUser, Document {
  isPasswordMatch: (password: string) => Promise<boolean>;
}

interface IUserModel extends Model<IUserDocument> {
  isEmailTaken: (username: string) => Promise<boolean>;
}

const userSchema = new mongoose.Schema<IUserDocument>({
  fullName: {
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
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 8,
    validate(value) {
      if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
        throw new Error('Password must contain at least one letter and one number');
      }
    },
    private: true, // used by the toJSON plugin
  },
  country: {
    type: String,
  },
  phoneNumber: {
    type: String,
    trim: true,
  },
  dateOfBirth: {
    type: String,
    trim: true,
  },
  gender: {
    type: String,
  },
  isEmailVerified: {
    type: Boolean,
    default: false,
  },
});

// add plugin that converts mongoose to json
userSchema.plugin(toJSON);
userSchema.plugin(paginate);

// userSchema.static('myStaticMethod', function myStaticMethod() {
//   return 42;
// });
userSchema.statics.isEmailTaken = async function (email: string, excludeUserId: any): Promise<boolean> {
  const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
  return !!user;
};

userSchema.methods.isPasswordMatch = async function (password: string): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};

userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

/**
 * @typedef User
 */
const User = mongoose.model<IUserDocument, IUserModel>('User', userSchema);

export default User;
