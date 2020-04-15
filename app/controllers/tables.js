'use strict'
const express = require('express')
const router = express.Router();
const _ = require('lodash')
const uuidv4 = require('uuid/v4');
const Joi = require('@hapi/joi');
const { sendJoiValidationError } = require('../utils/joi');
const config = require('../../config')
const querystring = require('querystring')
const request = require('request')

const {
  joiTableOneSchema,
  createTableOne,
  deleteTable,
  updateNewRecordToTable,
  getTable
} = require('../modules/tableOne')



router.post('/create/tableOne', async function(req, res) {
  const fieldList = ['studentName', 'tableName', 'date']
  let reqBody = _.pick(req.body, fieldList)

  const joiResult = joiTableOneSchema.validate(reqBody, {
    presence: 'required',
    abortEarly: false
  })

  const joiError = joiResult.error
  if(!_.isNil(joiError)) {
    return sendJoiValidationError(joiError, res)
  }

  try {
    const table = await getTable(reqBody)
    if(!_.isNil(table)) {
      return res.status(400).send({message: '该表格已存在'})
    }
    await createTableOne(reqBody)
    return res.sendStatus(200)
  } catch(err) {
    return res.status(500).send({message: err})
  }
})

// router.get('/info', async function(req, res) {
//
// })
// const authorization = require('../middlewares/auth')
// router.use(authorization.requiresLogin)
//
// router.get('/info', async function(req, res) {
//   const { userName } = req.decodedToken
//
//   try {
//     const group = await getMemberGroupInfo({ userName })
//     let memberList
//     if (!_.isNil(group)) {
//       const { groupName } = group
//       memberList = await getGroupMemberList({groupName})
//     }
//     return res.status(200).send({groupInfo: group, memberList: memberList})
//   } catch (err) {
//     return res.status(500).send({ message: '系统出错了, 请联系管理员'})
//   }
// })
//
// router.post('/join', async function(req, res) {
//   const { invitationCode } = req.body
//   const { userName } = req.decodedToken
//   try {
//     const member = await findMemberByUsername({
//       userName,
//     })
//     if (!_.isNil(member)) {
//       return res.status(400).send({message: '该成员已经有队伍了'})
//     }
//
//     const group = await findGroupByInvitationCode({invitationCode})
//     if (_.isNil(group)) {
//       return res.status(404).send({message: '该队不存在'})
//     }
//     const { groupName } = group
//     const memberList = await getGroupMemberList({groupName})
//     if (memberList.length >= 5) {
//       return res.status(400).send({message: '该队已满员'})
//     }
//     await createMember({ groupName, userName })
//     res.sendStatus(200)
//   } catch(err) {
//     res.status(500).send({message: '无法加入队伍, 请重试或联系管理员'})
//   }
//
// })
//
// async function asyncRequest(options) {
//   return new Promise((resolve, reject) => {
//     request(options, (error, response, body) => resolve({ error, response, body }));
//   });
// }
//
// router.post('/login/:wxCode', async function(req, res) {
//   const { wxCode } = req.params
//   const { nickName, avatarUrl } = req.body
//
//   const authData = {
//     'appid': config.wxAppID,
//     'secret': config.wxAppSecret,
//     'js_code': wxCode,
//     'grant_type': 'authorization_code'
//   }
//
//   const authContent = querystring.stringify(authData)
//
//   const url = 'https://api.weixin.qq.com/sns/jscode2session?' + authContent;
//   const result = await asyncRequest({
//     'url': url
//   })
//   const resultBody = JSON.parse(result.response.body);
//   const openid = resultBody.openid;
//   try {
//     const user = await wxUserLogin({openid, nickName, avatarUrl})
//     const userId = user._id;
//     console.log(user)
//     return res.status(200).send({userInfo: {userId, nickName, avatarUrl}})
//   } catch(err) {
//     return res.status(500).send({message: err.message})
//   }
// })
// router.post('/create', async function(req, res) {
//   const { userName } = req.decodedToken
//   const invitationCode = uuidv4()
//   const fieldList = ['groupName', 'groupContact']
//
//   // validate req body
//   let reqBody = _.pick(req.body, fieldList)
//   reqBody.invitationCode = invitationCode
//
//   const joiResult = Joi.validate(reqBody, joiGroupSchema, {
//     presence: 'required',
//     abortEarly: false,
//   })
//   const joiError = joiResult.error
//   if (!_.isNil(joiError)) {
//     return sendJoiValidationError(joiError, res)
//   }
//   // trim groupName
//   reqBody.groupName = reqBody.groupName.trim()
//   try {
//     const { groupName } = reqBody
//     // validation
//     const groupByName = await findGroupByGroupName({ groupName })
//     if (!_.isNil(groupByName)) {
//       return res.status(400).send({message: '队伍名已被占用'})
//     }
//
//     const groupByInvitation = await findGroupByInvitationCode({
//       invitationCode,
//     })
//     if (!_.isNil(groupByInvitation)) {
//       return res.status(400).send({message:'邀请码已被占用, 请重试'})
//     }
//
//     const member = await findMemberByUsername({userName})
//     if (!_.isNil(member)) {
//       return res.status(400).send({ message: '该成员已经有队伍了'})
//     }
//     // start create Group and Member
//     try {
//       await createGroup(reqBody)
//     } catch(err) {
//       return res.status(500).send({message: err.message})
//     }
//     await createLeader({ groupName, userName })
//     res.sendStatus(200)
//   } catch (err) {
//     res.status(500).send({message: err.message})
//   }
//
// })
//
// router.delete('/leave', async function(req, res){
//   const { userName } = req.decodedToken
//   try {
//     // validation
//     const member = await findMemberByUsername({ userName })
//     if(member.isLeader) {
//       return res.status(400).send({ message: '队长只可以解散队伍' })
//     }
//
//     await deleteMember({ userName })
//     res.sendStatus(200)
//   } catch(err) {
//     res.status(500).send({message: err.message})
//   }
// })
//
// router.delete('/delete/:groupName', async function(req, res) {
//   const { userName } = req.decodedToken
//   const { groupName } = req.params
//   try {
//     // validation
//     const member = await findMemberByUsername({ userName })
//     if(!member.isLeader || member.groupName !== groupName) {
//       return res.status(400).send({ message: '只有队长可以解散队伍' })
//     }
//
//     // start delete group and members
//     try {
//       await deleteGroup({ groupName })
//     } catch(err) {
//       return res.status(500).send({message: err.message})
//     }
//     await deleteAllMembersByGroupName({groupName})
//     res.sendStatus(200)
//   } catch (err) {
//     res.status(500).send({message: err.message})
//   }
// })

module.exports = router