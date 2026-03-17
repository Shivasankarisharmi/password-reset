const mongoose = require('mongoose')

// User Schema
const userSchema = new mongoose.Schema({
  // User email address
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },

  // Hashed password
  password: {
    type: String,
    required: true
  },

  // Random token sent in reset email
  resetToken: {
    type: String,
    default: null
  },

  // Token expiry time (15 minutes from creation)
  resetTokenExpiry: {
    type: Date,
    default: null
  }

}, { timestamps: true })

module.exports = mongoose.model('User', userSchema)