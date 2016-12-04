// module dependencies
const bcrypt    = require('bcrypt-nodejs');
const crypto    = require('crypto');
const mongoose  = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { 
    type: String, 
    unique: true,
    required: true
  },
  
  password: {
    type: String,
    required: true,
    select: false
  },

  passwordResetToken: String,
  passwordResetExpires: Date,

  facebook: String,
  twitter: String,
  google: String,
  github: String,
  instagram: String,
  linkedin: String,
  steam: String,
  tokens: Array,

  profile: {
    username: { type: String, default: 'User' },
    name: { type: String, default: '' },
    lastName: { type: String, default: '' },
    gender: { type: String, default: 'male' },
    location: { type: String, default: '' },
    website: { type: String, default: '' },
    image: { type: String, default: '' },
    role: { type: String, default: 'USER' },
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);