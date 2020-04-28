const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const STOSingleDataSchemaString = 'stoSingleData';
// const { userSchemaString } = require('./user');

const STOSingleDataSchema = new Schema({
  stoRecordID: { type: Schema.Types.ObjectId, required: true },
  isSuccess: {type: Boolean, required: true},
  promptLevel:{type: String, required: true},
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

mongoose.model(STOSingleDataSchemaString, STOSingleDataSchema);

module.exports = {
  STOSingleDataSchemaString,
  STOSingleDataSchema,
};