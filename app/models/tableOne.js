const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const tableOneSchemaString = 'tableOne';
// const { userSchemaString } = require('./user');

const TableOneSchema = new Schema({
  studentName: { type: String, required: true },
  tableName: { type: String, required: true },
  date: { type: Date, required: true },
  records: [{ sto: String, isCompleted: Boolean, hint: String}],
  note: {type: String},
});

TableOneSchema.index({studentName: 1, tableName: 1, date: 1}, {unique: true})

// GroupSchema.virtual('user', {
//   ref: userSchemaString,
//   localField: 'groupName',
//   foreignField: 'groupName',
//   justOne: true,
// });
//
// GroupSchema.statics = {
//   definedPopulate(query) {
//     return query.populate('user');
//   },
// };

mongoose.model(tableOneSchemaString, TableOneSchema);

module.exports = {
  tableOneSchemaString,
  TableOneSchema,
};