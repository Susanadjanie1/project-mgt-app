// app/models/User.js

import mongoose from 'mongoose';
import { ROLES } from 'lib/constants';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: Object.values(ROLES),
    default: ROLES.MEMBER,
  },
});

export default mongoose.models.User || mongoose.model('User', userSchema);
