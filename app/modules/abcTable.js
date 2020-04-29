'use strict';
// const config = require('../../config');
const mongoose = require('mongoose');
const { ABCTableSchemaString } = require('../models/abcTable');
const Joi = require('@hapi/joi');
const _ = require('lodash')

const ABCTable= mongoose.model(ABCTableSchemaString);

const joiABCTableSchema = Joi.object().keys({
  studentName: Joi.string().min(1).max(10).required(),
  tableName: Joi.string().min(1).max(10).required(),
  date: Joi.date(),
});

async function createABCTable({ studentName, tableName, date }) {
  const newABCTable = new ABCTable({ studentName, tableName, date, stoRecords: []})
  return newABCTable.save()
}



async function getABCTable({ tableID }) {
  // need to populate twice as we have nested arrays
  return ABCTable.findOne({ _id: tableID })
    .populate({
      path: 'abcRecords',
      model: 'abcRecord'
    })
}

module.exports = {
  joiABCTableSchema,
  createABCTable,
  getABCTable
}