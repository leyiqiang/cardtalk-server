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

  // Private routes
  const wxUser = require('./wxUser')
  apiRouter.use('/wxUser', wxUser)

  apiRouter.use(authErrorHandler)
}