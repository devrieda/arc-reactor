require('./stylesheets/application.scss');

// plugins
import PluginManager from './helpers/PluginManager';
PluginManager.install(require('./helpers/Plugins/InlineCode'));

export { PluginManager };
export Editor from './components/Editor';
