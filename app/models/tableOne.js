const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const tableOneSchemaString = 'tableOne';
// const { userSchemaString } = require('./user');

const TableOneSchema = new Schema({
  studentName: { type: String, required: true },
  tableName: { type: String, required: true },
  date: { type: Date, required: true },
  records: [{ type: Schema.Types.ObjectId, ref: 'stoRecord'}],
  note: {type: String, default: ""},
});

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