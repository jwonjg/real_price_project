var crypto = require('crypto');
var bcrypt = require('bcrypt-nodejs');
var mongoose = require('mongoose');

var schemaOptions = {
  timestamps: true,
  toJSON: {
    virtuals: true
  }
};

var ContentSchema = new mongoose.Schema({
  content: String,
  link: String
}, { _id : false });

var movieSchema = new mongoose.Schema({
  movieCd: { type: String, unique: true},
  movieNm: String,
  engMovieNm: String,
  openDt: Date,
  rating: String,
  runtime: String,
  thumbnail: String,
  story: String,
  nation: String,
  category: String,
  photoViewerUrl: String,
  reserveUrl: String,
  genre: [String],
  photoUrl: [String],
  trailer: ContentSchema,
  director: ContentSchema,
  actor: [ContentSchema],
  video: [ContentSchema],
  realPrice: Number
}, schemaOptions);

var Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
