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
          max:2,
          display: false,
          identifier: `${identifier}-status`
        }
      ]
    };
    sails.log.info(newDevice);
    // Create the device
    gladys.device.create(newDevice)
    // Then set connected value
    .then(() => gladys.deviceState.createByDeviceTypeIdentifier(`${identifier}-connected`, 'hyperion', {value: 1}))
    .catch((err) => sails.log.error(`Kodi module : Error while creating device : ${err}`));
  });
};
