var mongoose = require('mongoose');

var schemaOptions = {
  timestamps: true,
  toJSON: {
    virtuals: true
  },
  toObject: {
    virtuals: true
  }
};

var priceSchema = new mongoose.Schema({
  movieCd: String,
  email: String,
  realPrice: Number,
  createDate: { type: Date, default: Date.now() },
  updateDate: { type: Date, default: Date.now() }
}, schemaOptions);

var Price = mongoose.model('Price', priceSchema);

module.exports = Price;
