'use strict'
const express = require('express')
const mongoose = require('mongoose');
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
  getTable,
  getAllTableOnes,
} = require('../modules/tableOne')

const { createSTORecord,
  findSTOByTableIdAndName,
  getSTORecord
} = require('../modules/stoRecord')

const { createSTOSingleData, changeSTOSingleData } = require('../modules/stoSinglData')

const authorization = require('../middlewares/auth')
router.use(authorization.requiresLogin)

// tables management
router.get('/', async function(req, res) {
  try {
    const tableOnes = await getAllTableOnes();
    // const abcTable = await getAllABCTables();
    // todo append all lists
    return res.status(200).send({tables: tableOnes})
  } catch (e) {
    return res.status(500).send({message: err})
  }
})



module.exports = router