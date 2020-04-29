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



router.get('/all', async function(req, res) {
  try {
    const tableOnes = await getAllTableOnes();
    return res.status(200).send({tables: tableOnes})
  } catch(e) {
    return res.status(500).send({message: err})
  }
})

router.post('/create', async function(req, res) {
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
    } else {
      const tableOne = await createTableOne(reqBody)
      return res.status(200).send(tableOne)
    }
  } catch(err) {
    return res.status(500).send({message: err})
  }
})

router.post('/newSTO/:tableID', async function(req, res) {
  const { tableID } = req.params
  if(!mongoose.Types.ObjectId.isValid(tableID)) {
    return res.status(404).send({message:"非法表格ID"})
  }

  const tableData = await getTable({ tableID })
  if(_.isNil(tableData)) {
    return res.status(404).send({message:"该表格不存在"})

  }
  const fieldList = ['stoName']
  let reqBody = _.pick(req.body, fieldList)
  if(_.isNil(reqBody.stoName)) {
    return res.status(404).send({message:"STO不可为空"})
  }
  const foundedSTO = await findSTOByTableIdAndName({tableID, stoName: reqBody.stoName})
  if(foundedSTO.length > 0){
    return res.status(400).send({message:"该STO已存在"})
  }
  try {
    const newSTO = await createSTORecord({tableID, sto: reqBody.stoName})
    return res.status(200).send({newSTO: newSTO })
  } catch(err) {
    return res.status(500).send({message: err})
  }
})


router.get('/:tableID', async function(req, res) {
  const { tableID } = req.params
  if(mongoose.Types.ObjectId.isValid(tableID)){
    const tableData = await getTable({ tableID })
    if(!_.isNil(tableData)) {
      return res.status(200).send(tableData)
    } else {
      return res.status(404).send({message:"该表格不存在"})
    }
  } else {
    return res.status(400).send({message:"非法表格ID"})
  }
})

router.post('/add/:stoID', async function(req, res) {
  const { stoID } = req.params
  if(! mongoose.Types.ObjectId.isValid(stoID)) {
    return res.status(400).send({message:"非法STO ID"})
  }
  const stoRecord = await getSTORecord({ stoRecordID: stoID })
  if(_.isNil(stoRecord)) {
    return res.status(404).send({message: "该STO不存在"})
  }
  const fieldList = ['isSuccess', 'promptLevel']
  let reqBody = _.pick(req.body, fieldList)
  // try {
  const stoSingleData = await createSTOSingleData({ stoRecordID: stoID, isSuccess: reqBody.isSuccess, promptLevel: reqBody.promptLevel})
  return res.status(200).send({ stoSingleData: stoSingleData })
  // } catch(err) {
  //   return res.status(500).send({message: err})
  // }
})

router.post('/edit/:stoSingleID', async function(req, res) {
  const { stoSingleID } = req.params
  if(! mongoose.Types.ObjectId.isValid(stoSingleID)) {
    return res.status(400).send({message:"非法ID"})
  }
  const fieldList = ['isSuccess', 'promptLevel']
  const reqBody =  _.pick(req.body, fieldList)
  try {
    await changeSTOSingleData({ stoSingleDataID: stoSingleID, isSuccess: reqBody.isSuccess, promptLevel: reqBody.promptLevel})
    return res.sendStatus(200)
  } catch(err) {
    return res.status(500).send({message: err})
  }
})



module.exports = router