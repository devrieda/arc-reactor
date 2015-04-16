window.DEBUG = false;

// styles
require('./stylesheets/application.scss');

exports.Editor  = require('./components/Editor');
exports.MenuToolbar = require('./components/MenuToolbar');
exports.MenuButtons = require('./components/MenuButtons');
var KeyCommands = require('./modules/KeyCommands');
exports.Commands = new KeyCommands();
