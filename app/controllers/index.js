'use strict'

module.exports = function (app) {
  const express = require('express')
  const { authErrorHandler } = require('../middlewares/errorHandler')

  const apiRouter = express.Router()
  app.use('/api', apiRouter)

  apiRouter.get('/easo', async function(req, res) {
    res.send('感谢支持!')
  })

  // Public routes
  // const auth = require('./auth')
  // apiRouter.use('/auth', auth)
  // const cardImages = require('./cardImages')

  // Private routes

  const tables = require('./tables')

  const tableOne = require('./tableOne')

  const abcTable = require('./abcTable')

  apiRouter.use('/tables', tables)
  apiRouter.use('/tableOne', tableOne)
  apiRouter.use('/abcTable', abcTable)


  apiRouter.use(authErrorHandler)
}