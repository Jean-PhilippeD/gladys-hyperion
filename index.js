module.exports = function(sails) {

  var setup = require('./lib/hyperion.setup');
  var install = require('./lib/hyperion.install');
  var command = require('./lib/hyperion.command');

  // Event when Gladys start and is ready
  gladys.on('ready', () => setup());

  return {

    // Method called by gladys to install/init module
    install: install,

    // Method called by gladys to notify
    //notify: require('./lib/notify'),

    // Method called by Gladys when user click on the configure button
    setup: setup,
    command: command

    // Method called by Gladys to exec action on device
    //exec: require('./lib/exec'),

  };
  
};
