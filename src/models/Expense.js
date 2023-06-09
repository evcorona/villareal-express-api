const mongoose = require('mongoose')

const schema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      min: 1,
      required: true,
    },
    treasurerId: {
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
  },
  { timestamps: true }
)

module.exports = mongoose.model('Expense', schema)
