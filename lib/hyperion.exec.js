var shared = require('./hyperion.shared.js');
var Promise = require('bluebird');

module.exports = function exec(options) {

    var hyperion = shared.device[options.deviceType.identifier];

    if (!hyperion) return Promise.reject('Hyperion instance not connected !');

    if(options.state.value === 1) hyperion.clear();
    if(options.state.value === 0 || (options.state.value >= 2 && options.state.value < 100)) hyperion.setColor(shared.colors[options.state.value]);
    
    if(options.state.value >= 100) {
      hyperion.setEffect(shared.effects[options.state.value], hyperion.clear());
    }

}
