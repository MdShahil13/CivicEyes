const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  role: {
    type: String,
    enum: ['user', 'helper'],
    default: 'user',
    required: true,
  },
  category: {
    type: String,
    trim: true,
    default: null,
    validate: {
      validator: function (value) {
        // category is required for helper users and optional for regular users
        if (this.role === 'helper') {
          return typeof value === 'string' && value.length > 0;
        }
        return true;
      },
      message: function () {
        return 'Category is required for helper role';
      },
    },
  },
  village: {
    type: String,
    trim: true,
    default: null,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('User', UserSchema);