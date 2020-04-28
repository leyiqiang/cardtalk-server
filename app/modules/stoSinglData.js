'use strict';
// const config = require('../../config');
const mongoose = require('mongoose');
const { STOSingleDataSchemaString } = require('../models/stoSingleData');
const Joi = require('@hapi/joi');
const _ = require('lodash')

const STOSingleData = mongoose.model(STOSingleDataSchemaString);


async function createSTOSingleData({ stoRecordID, isSuccess, promptLevel }) {
  const newSTOSinglData = new STOSingleData({ stoRecordID, isSuccess, promptLevel })
  return newSTOSinglData.save()
}

async function changeSTOSingleData({stoSingleDataID, isSuccess, promptLevel}) {
  return STORecord.findOneAndUpdate({
    _id: stoSingleDataID},
    {
      isSuccess: isSuccess,
      promptLevel: promptLevel
  })
}
module.exports = {
  createSTOSingleData,
  changeSTOSingleData
}