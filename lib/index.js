window.DEBUG = true;

exports.Editor  = require('./components/Editor');
exports.Toolbar = require('./components/Toolbar');
exports.MenuButtons = require('./components/MenuButtons');
var Commands = require('./modules/Commands');
exports.Commands = new Commands();
