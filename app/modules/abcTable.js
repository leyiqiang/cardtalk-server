'use strict';
// const config = require('../../config');
const mongoose = require('mongoose');
const { ABCTableSchemaString } = require('../models/abcTable');
const Joi = require('@hapi/joi');
const _ = require('lodash')

const ABCTable= mongoose.model(ABCTableSchemaString);


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
  createABCTable,
  getABCTable
}