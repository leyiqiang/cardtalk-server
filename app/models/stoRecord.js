const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const STORecordSchemaString = 'stoRecord';
// const { userSchemaString } = require('./user');

const STORecordSchema = new Schema({
  tableID: { type: Schema.Types.ObjectId, ref:"tableOne" },
  sto: {type: String},
  stoList: [{
    isSuccess: {type: Boolean, required: true},
    promptLevel:{type: String, required: true},
    note: {type: String, required: false}
  }]
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

mongoose.model(STORecordSchemaString, STORecordSchema);

module.exports = {
  STORecordSchemaString,
  STORecordSchema,
};