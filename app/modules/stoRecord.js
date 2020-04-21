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


async function createSTORecord({ sto }) {
  const newSTORecord = new STORecord({ sto, stoList: []})
  return newSTORecord.save()
}

async function updateSTORecordById({id, stoList}) {
  return STORecord.findOneAndUpdate({
    _id: id
  }, {stoList: stoList})
}

async function addSTORecordById({ id, newStoRecord}) {
  return STORecord.findOneAndUpdate({
    _id: id
  }, {
    $push: {stoList: newStoRecord}
  })
}

module.exports = {
  createSTORecord,
  updateSTORecordById,
  addSTORecordById,
}