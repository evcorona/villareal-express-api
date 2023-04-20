const mongoose = require('mongoose')

const schema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      min: 1,
      required: true,
    },
    collectorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    concept: {
      type: String,
      lowercase: true,
      minlength: 5,
      required: true,
      trim: true,
    },
    houseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'House',
      required: true,
    },
    dateApplied: {
      type: Date,
      required: true,
    },
    isAggregated: {
      type: Boolean,
      default: false,
      required: true,
    },
    treasurerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Income', schema)
