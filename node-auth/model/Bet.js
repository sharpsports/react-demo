const mongoose = require("mongoose");

const BetSchema = mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  bettor: {
    type: String,
    required: true
  },
  book: {
    type: Object,
    required: true
  },
  bettorAccount: {
    type: String,
    required: true
  },
  parlayId: {
    type: String,
    default: null
  }
  ,
  parlayOdds: {
    type: String,
    default: null
  },
  timePlaced: {
    type: Date,
    default: null
  },
  status: {
    type: String,
    required: true
  },
  contest: {
    type: String,
    required: true
  },
  period: {
    type: String,
    required: true
  },
  proposition: {
    type: String,
    required: true
  },
  position: {
    type: String,
    required: true
  },
  outcome: {
    type: String,
    default: null
  },
  toWin: {
    type: Number,
    required: true
  },
  atRisk: {
    type: Number,
    required: true
  },
  line: {
    type: Number,
    required: true
  },
  odds: {
    type: Number,
    required: true
  },
  refreshResponse: {
    type: String,
    required: true
  }
});

// export model user with UserSchema
module.exports = mongoose.model("bet", BetSchema);