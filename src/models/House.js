const mongoose = require('mongoose')

const schema = new mongoose.Schema(
  {
    houseNumber: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      default: 'deudor',
      enum: ['deudor', 'al corriente'],
    },
    street: {
      type: String,
      enum: ['verde', 'hermosa', 'escondida', 'dorada', 'florida'],
      required: true,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('House', schema)
