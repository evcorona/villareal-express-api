const mongoose = require('mongoose')

const schema = new mongoose.Schema(
  {
    email: {
      type: String,
      lowercase: true,
      match: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/gim,
      minlength: 5,
      required: true,
      trim: true,
      unique: true,
    },
    firstName: {
      type: String,
      minlength: 10,
      lowercase: true,
      trim: true,
      required: true,
    },
    lastName: {
      type: String,
      minlength: 10,
      lowercase: true,
      trim: true,
      required: true,
    },
    houseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'House',
    },
    lastLoginAt: {
      type: Date,
    },
    password: {
      type: String,
      minlength: 5,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      enum: ['tesorero', 'admin', 'cobranza'],
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
      required: true,
    },
  },
  { timestamps: true }
)

schema.index({ email: 1 })

module.exports = mongoose.model('User', schema)
