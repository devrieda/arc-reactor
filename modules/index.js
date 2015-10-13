require('./stylesheets/application.scss');

// plugins
const PluginManager = require('./helpers/PluginManager');
PluginManager.install(require('./helpers/Plugins/InlineCode'));

const Editor = require('./components/Editor');

const Keys = require('./helpers/KeyCommands');
exports.Keys = new Keys();

exports.Editor  = Editor;
exports.PluginManager = PluginManager;
