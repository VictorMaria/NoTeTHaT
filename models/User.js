import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  avatar: {
    type: String,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  socialId: {
    type: String,
  },
  registrationMode: {
    type: String,
  },
  userType: {
    type: String,
    default: 'user',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
  },
});

const User = mongoose.model('User', UserSchema);

export default User;
