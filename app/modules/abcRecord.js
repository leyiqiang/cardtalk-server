'use strict';
// const config = require('../../config');
const mongoose = require('mongoose');
const { ABCRecordSchemaString } = require('../models/abcRecord');
const Joi = require('@hapi/joi');
const _ = require('lodash')

const ABCRecord = mongoose.model(ABCRecordSchemaString);


async function createABCRecord({ tableID, antecedent, behavior, consequence }) {
  const newABCRecord = new ABCRecord({ tableID, antecedent, behavior, consequence})
  return newABCRecord.save()
}

async function editABCRecord({ abcRecordID, antecedent, behavior, consequence }) {
  return ABCRecord.findOneAndUpdate({
    _id:abcRecordID
  }, {
    antecedent: antecedent, consequence: consequence, behavior: behavior
  })
}

async function getABCRecord({abcRecordID}) {
  return ABCRecord.find({
    _id: abcRecordID
  })
}

async function deleteABCRecord({abcRecordID}) {
  return ABCRecord.findOneAndDelete({
    _id: abcRecordID
  })
}

module.exports = {
  createABCRecord,
  getABCRecord,
  editABCRecord,
  deleteABCRecord
}