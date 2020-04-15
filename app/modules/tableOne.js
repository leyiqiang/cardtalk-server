'use strict';
// const config = require('../../config');
const mongoose = require('mongoose');
const { tableOneSchemaString } = require('../models/tableOne');
const Joi = require('@hapi/joi');
const _ = require('lodash')

const TableOne = mongoose.model(tableOneSchemaString);

//
// const TableOneSchema = new Schema({
//   studentName: { type: String, required: true },
//   tableName: { type: String, required: true },
//   date: { type: Date, required: true },
//   records: [{ sto: String, isCompleted: Boolean, hint: String}],
//   note: {type: String},
// });

const joiRecord = Joi.object().keys({
  sto: Joi.string().required(),
  isCompleted: Joi.boolean().required(),
  hint: Joi.string()
})

const joiTableOneSchema = Joi.object().keys({
  studentName: Joi.string().min(1).max(10).required(),
  tableName: Joi.string().min(1).max(10).required(),
  date: Joi.date(),
});

async function createTableOne({ studentName, tableName, date }) {
  const newTableOne = new TableOne({ studentName, tableName, date, stos: [], records: []})
  return newTableOne.save()
}

async function deleteTable({ studentName, tableName, date}) {
  return TableOne.findOneAndDelete({ studentName, tableName, date })
}

async function updateNewStoToTable({ studentName, tableName, date, stos}) {
  return TableOne.findOneAndUpdate({
      studentName, tableName, date},
    {
      stos
    })
}

async function updateNewRecordToTable( { studentName, tableName, date, records}) {
  return TableOne.findOneAndUpdate({
    studentName, tableName, date},
    {
      records
  })
}

async function getTable({ studentName, tableName, date}) {
  return TableOne.findOne({ studentName, tableName, date })
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
  joiTableOneSchema,
  createTableOne,
  deleteTable,
  updateNewRecordToTable,
  getTable
}