import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  address: String,
  profession: String,
  username: String,
  password: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const User = model('User', userSchema);
export default User;
