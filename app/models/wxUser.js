const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const wxUserSchemaString = 'wxUser';
// const { userSchemaString } = require('./user');

const WxUserSchema = new Schema({
  openid: { type: String, required: true, unique: true },
  code: { type: String, required: true },
  avatarUrl: { type: String, required: true },
  nickName: {type: String, requried: true},
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

mongoose.model(wxUserSchemaString, WxUserSchema);

module.exports = {
  wxUserSchemaString,
  WxUserSchema,
};