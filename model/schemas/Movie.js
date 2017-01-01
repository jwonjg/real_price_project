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

var ContentSchema = new mongoose.Schema({
  content: String,
  link: String
}, { _id : false });

var movieSchema = new mongoose.Schema({
  movieCd: { type: String, unique: true},
  movieNm: String,
  engMovieNm: String,
  openDt: Date,
  openStateCd: String,
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
  realPrice: Number,
  createDate: { type: Date, default: Date.now() },
  updateDate: { type: Date, default: Date.now() }
}, schemaOptions);

movieSchema.virtual('openStateCdInfo', {
  ref: 'Code',
  localField: 'openStateCd',
  foreignField: 'codeId',
  justOne: true
});

var Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
