'use strict';
// const config = require('../../config');
const mongoose = require('mongoose');
const { STORecordSchemaString } = require('../models/stoRecord');
const Joi = require('@hapi/joi');
const _ = require('lodash')

const STORecord = mongoose.model(STORecordSchemaString);

//
// const TableOneSchema = new Schema({
//   studentName: { type: String, required: true },
//   tableName: { type: String, required: true },
//   date: { type: Date, required: true },
//   records: [{ sto: String, isCompleted: Boolean, hint: String}],
//   note: {type: String},
// });


async function createSTORecord({ tableID, sto }) {
  const newSTORecord = new STORecord({ tableID, sto})
  return newSTORecord.save()
}

async function findSTOByTableIdAndName({tableID, stoName}) {
  return STORecord.find({
    tableID: tableID,
    sto: stoName
  })
}


async function getSTORecord({stoRecordID}) {
  return STORecord.find({
    _id: stoRecordID
  })
}
module.exports = {
  createSTORecord,
  findSTOByTableIdAndName,
  getSTORecord
}