const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  regType: {
    type: String, 
    enum: ['service', 'local'],
    default: 'service'
  }, 
  username : {
    type: String,
    required: true,
  },
  email : {
    type: String,
    required: true,
    unique: true,
  },
 
  password : {
    type: String,
    required: true,
  }, 
});

module.exports = mongoose.model('User', userSchema);