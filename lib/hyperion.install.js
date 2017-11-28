var Promise = require('bluebird');
var shared = require('./hyperion.shared.js');

module.exports = function() {
  return gladys.param.setValue({key: 'hyperion', value: 'host:port,host1:port1'});
}

