const mongoose = require('mongoose');

// Define the schema
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true, // Ensure email uniqueness
    trim: true // Remove whitespace from both ends
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    default:null,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6 // Minimum password length
  },
  role: {
    type: String,
    enum: ['user', 'admin', 'guest'],
    default: 'user'
  }
}, {
  timestamps: true // Automatically manage createdAt and updatedAt fields
});

// Create and export the model
module.exports = mongoose.model('User', userSchema);
