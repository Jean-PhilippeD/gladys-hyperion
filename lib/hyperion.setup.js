const Promise = require('bluebird');
const connect = require('./hyperion.connect');

module.exports = function(){

  // Get devices saved by user
  return gladys.param.getValue('hyperion')

    // Then connect each device
    .then((value) => Promise.map(value.split(','), connect));

};
