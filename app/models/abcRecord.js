const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ABCRecordSchemaString = 'abcRecord';
// const { userSchemaString } = require('./user');

const ABCRecordSchema = new Schema({
  tableID: { type: Schema.Types.ObjectId, required: true },
  antecedent: { type: String, required: true},
  behavior: { type: String, required: true},
  consequence: { type: String, required: true},
});

mongoose.model(ABCRecordSchemaString, ABCRecordSchema);

module.exports = {
  ABCRecordSchemaString,
  ABCRecordSchema,
};