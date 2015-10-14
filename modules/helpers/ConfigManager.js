// import Blocks from './Config/Blocks';
// import MenuButtons from './Config/MenuButtons';
// import BarButtons from './Config/BarButtons';
// import Keys from './Config/Keys';

const DEFAULT_MENU = [
  "bold", "italic", "h1", "h2", "h3", "center", "quote", "link"
];

const DEFAULT_BAR = [
  "image", "section"
];

class ConfigManager {
  static install(config) {
    return new this(config);
  }

  constructor(config) {
    this._installPlugins(config);
    this._installMenuButtons(config);
    this._installBarButtons(config);
  }

  // plugins
  _installPlugins(config) {
    if (!config.plugins) return;

    const plugins = config.plugins();

    // register blocks, menu buttons, bar buttons, and keys
    plugins.forEach( (plugin) => {
      console.log('install plugin', plugin.name);
    });
  }

  // config menu buttons
  _installMenuButtons(config) {
    let buttons = config.menuButtons && config.menuButtons();
    if (!buttons || !buttons.length) { buttons = DEFAULT_MENU; }

    // add each button the stack
    buttons.forEach( (button) => {
      console.log('install menu: ', button);
    });
  }

  // config bar buttons
  _installBarButtons(config) {
    let buttons = config.barButtons && config.barButtons();
    if (!buttons || !buttons.length) { buttons = DEFAULT_BAR; }

    // add each button the stack
    buttons.forEach( (button) => {
      console.log('install bar: ', button);
    });
  }
}

export default ConfigManager;
