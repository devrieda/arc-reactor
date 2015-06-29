window.DEBUG = false;

require('./stylesheets/application.scss');

exports.Editor  = require('./components/Editor');
exports.MenuToolbar = require('./components/MenuToolbar');
exports.MenuButtons = require('./components/MenuButtons');

var Keys = require('./modules/KeyCommands');
exports.Keys = new Keys();
