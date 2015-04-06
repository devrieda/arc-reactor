window.DEBUG = true;

exports.Editor  = require('./components/Editor');
exports.Toolbar = require('./components/Toolbar');
exports.Buttons = require('./components/Buttons');
var Commands = require('./modules/Commands');
exports.Commands = new Commands();
