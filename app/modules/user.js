'use strict'
const jwt = require('jsonwebtoken')


/**
 * private helper method for verifying token
 * @param token
 * @returns {Promise}
 */
async function decodeToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, config.secret, function(err, decoded) {
      if (err) {
        reject(err);
      }
      resolve(decoded);
    });
  });
}

module.exports = {
  decodeToken
}