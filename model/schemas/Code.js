var mongoose = require('mongoose');

var schemaOptions = {
  timestamps: true,
  toJSON: {
    virtuals: true
  }
};

var codeSchema = new mongoose.Schema({
  codeId: { type: String, unique: true},
  codeGrpId: String,
  codeNm: String,
  codeDesc: String,
  displayOrder: Number,
  createDate: { type: Date, default: Date.now() },
  updateDate: { type: Date, default: Date.now() }
}, schemaOptions);

var Code = mongoose.model('Code', codeSchema);

module.exports = Code;
