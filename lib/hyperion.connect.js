const Hyperion = require('hyperion-client');
const Promise = require('bluebird');
var shared = require('./hyperion.shared.js');

module.exports = function(identifier){

  // Already connected
  if(typeof(shared.device[identifier]) !== 'undefined')
    return true;

  //var host, port;
  var identifiers = identifier.split(':');
  var host = identifiers[0];
  var port = identifiers[1];
  var identifier = host + '-' + port;

  sails.log.info(`Hyperion module : Try connecting to ${host}:${port}`);

  var hyperion = new Hyperion(host, port);

  hyperion.on('connect', function(){
    sails.log.info('Hyperion : connected !');

    shared.device[identifier] = hyperion;

    var newDevice = {
      device: {
          name: `Hyperion ${host}`,
          protocol: 'hyperion',
          service: 'hyperion',
          identifier: identifier
      },
      types: [
        {
          name:'status',
          type: 'status',
          //tag: '',
          sensor: false,
          //unit: '',
          min: 0,
          max: 200,
          display: false,
          identifier: `${identifier}-status`
        }
      ]
    };

    // Create the device
    gladys.device.create(newDevice)
    // Then set connected value
    .catch((err) => sails.log.error(`Hyperion module : Error while creating device : ${err}`));
  });

  hyperion.on('error', function(err) {
    sails.log.warn(err)
  });
};
