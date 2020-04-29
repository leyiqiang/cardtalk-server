const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ABCTableSchemaString = 'ABCTable';
// const { userSchemaString } = require('./user');

const ABCTableSchema = new Schema({
  studentName: { type: String, required: true },
  tableName: { type: String, required: true },
  date: { type: Date, required: true },
  note: {type: String, default: ""},
},{ toJSON: { virtuals: true }, toObject: { virtuals: true }});


ABCTableSchema.virtual('abcRecords', {
  ref: 'abcRecord',
  localField: '_id',
  foreignField: 'tableID',
  justOne: false,
})

mongoose.model(ABCTableSchemaString, ABCTableSchema);

module.exports = {
  ABCTableSchemaString,
  ABCTableSchema,
};