const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const defaultCardsSchemaString = 'defaultCards';
// const { userSchemaString } = require('./user');

const DefaultCardsSchema = new Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  picture: {type: String, requried: true},
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

mongoose.model(defaultCardsSchemaString, DefaultCardsSchema);

module.exports = {
  defaultCardsSchemaString,
  DefaultCardsSchema,
};