const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ABCRecordSchemaString = 'abcRecord';
// const { userSchemaString } = require('./user');

const ABCRecordSchema = new Schema({
  tableID: { type: Schema.Types.ObjectId },
  antecedent: { type: String },
  behavior: { type: String },
  consequence: { type: String },
});

mongoose.model(ABCRecordSchemaString, ABCRecordSchema);

module.exports = {
  ABCRecordSchemaString,
  ABCRecordSchema,
};