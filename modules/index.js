require('./stylesheets/application.scss');

// plugins
const PluginManager = require('./helpers/PluginManager');
PluginManager.install(require('./helpers/Plugins/InlineCode'));

const Editor = require('./components/Editor');
const MenuToolbar = require('./components/MenuToolbar');
const MenuButtons = require('./components/MenuButtons');

const Keys = require('./helpers/KeyCommands');
exports.Keys = new Keys();

exports.Editor  = Editor;
exports.MenuToolbar = MenuToolbar;
exports.MenuButtons = MenuButtons;
exports.PluginManager = PluginManager;
