'use strict';
// const config = require('../../config');
const mongoose = require('mongoose');
const { wxUserSchemaString } = require('../models/wxUser');
const Joi = require('@hapi/joi');
const _ = require('lodash')

const WxUser = mongoose.model(wxUserSchemaString);

const joiWxUserSchema = Joi.object().keys({
  openid: Joi.string().required(),
  nickName: Joi.string().required(),
  avatarUrl: Joi.string().required(),
});

async function wxUserLogin({ openid, nickName, avatarUrl}) {
  return WxUser.findOneAndUpdate({ openid },
    {
      nickName,
      avatarUrl
    }, {
    upsert: true,
    })
  // console.log(wxUser)
  // if (_.isNil(wxUser)) {
  //   const newWxUser = new wxUser({openid, nickName, avatarUrl})
  //   return newWxUser.save()
  // } else {
  //   return wxUser.findOneAndUpdate({openid}, {
  //     nickName, avatarUrl
  //   })
  // }
}

// async function findGroupByGroupName({ groupName }) {
//   return WxUser.findOne({ groupName })
// }
//
// async function findGroupByInvitationCode({ invitationCode }) {
//   return WxUser.findOne({ invitationCode })
// }
//
// async function createGroup({ groupName, groupContact, invitationCode }) {
//   const newGroup = new WxUser({ groupName, groupContact, invitationCode})
//   return newGroup.save()
// }
//
// async function deleteGroup({ groupName }) {
//   return WxUser.findOneAndDelete({ groupName })
// }
//
//
// async function getAllGroups() {
//   return WxUser.find({})
// }

module.exports = {
  joiWxUserSchema,
  wxUserLogin,
  // deleteGroup,
  // findGroupByInvitationCode,
  // findGroupByGroupName,
  // createGroup,
  // getAllGroups,
}