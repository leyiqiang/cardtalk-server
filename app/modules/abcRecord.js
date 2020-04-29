'use strict';
// const config = require('../../config');
const mongoose = require('mongoose');
const { ABCRecordSchemaString } = require('../models/abcRecord');
const Joi = require('@hapi/joi');
const _ = require('lodash')

const ABCRecord = mongoose.model(ABCRecordSchemaString);


async function createABCRecord({ tableID, antecedent, behavior, consequence }) {
  const newSTORecord = new ABCRecord({ tableID, antecedent, behavior, consequence})
  return newSTORecord.save()
}

async function getABCRecord({abcRecordID}) {
  return ABCRecord.find({
    _id: abcRecordID
  })
}
module.exports = {
  createABCRecord,
  getABCRecord
}