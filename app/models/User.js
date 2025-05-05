// app/models/User.js

import mongoose from 'mongoose';

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
    enum: ['admin', 'manager', 'team'], // Define roles for filtering if needed
    default: 'team',
  },
});

export default mongoose.models.User || mongoose.model('User', userSchema);
