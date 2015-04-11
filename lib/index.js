window.DEBUG = false;
exports.Editor  = require('./components/Editor');
exports.MenuToolbar = require('./components/MenuToolbar');
exports.MenuButtons = require('./components/MenuButtons');
var Commands = require('./modules/Commands');
exports.Commands = new Commands();
