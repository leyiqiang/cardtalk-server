const _ = require('lodash');

const requiredEnvList = [
  'SESSION_SECRET',
  'MONGO_DB_URI',
  'WX_APP_ID',
  'WX_APP_SECRET'
];

function checkRequiredEnv() {
  const unsetEnv = _.filter(requiredEnvList, (envString) => {
    return _.isNil(process.env[envString])
  });

  if (unsetEnv.length > 0) {
    throw new Error('Required ENV variables are not set: [' + unsetEnv.join(', ') + ']');
  }
}

module.exports = {
  checkRequiredEnv,
};