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
    monthApplied: {
      enum: [
        'Ene',
        'Feb',
        'Mar',
        'Abr',
        'May',
        'Jun',
        'Jul',
        'Ago',
        'Sep',
        'Oct',
        'Nov',
        'Dic',
      ],
      type: String,
    },
    receiptNumber: {
      type: String,
      match: /^[0-9]+$/,
      required: true,
    },
    isAggregated: {
      type: Boolean,
      default: false,
      required: true,
    },
    adminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Income', schema)
