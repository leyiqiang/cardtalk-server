const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const STORecordSchemaString = 'stoRecord';
// const { userSchemaString } = require('./user');

const STORecordSchema = new Schema({
  tableID: { type: Schema.Types.ObjectId, required: true },
  sto: {type: String, required: true},
},{ toJSON: { virtuals: true }, toObject: { virtuals: true }});


STORecordSchema.virtual('stoList', {
  ref: 'stoSingleData',
  localField: '_id',
  foreignField: 'stoRecordID',
  justOne: false,
})
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

mongoose.model(STORecordSchemaString, STORecordSchema);

module.exports = {
  STORecordSchemaString,
  STORecordSchema,
};