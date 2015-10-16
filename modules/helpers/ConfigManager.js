import invariant from "react/lib/warning";
import BlockConfig from './Config/BlockConfig';
import MenuButtonConfig from './Config/MenuButtonConfig';
import BarButtonConfig from './Config/BarButtonConfig';
import KeyConfig from './Config/KeyConfig';

import ArcPlugins from '../plugins';
const DEFAULT_PLUGINS = ArcPlugins.map((plugin) => plugin.name);

const DEFAULT_MENU = [
  "bold", "italic", "h1", "h2", "h3", "center", "quote", "link"
];

const DEFAULT_BAR = [
  "section"
];

class ConfigManager {
  /**
   * Install a new config
   *
   * config:
   *   - arcPlugins
   *   - plugins
   *   - menuButtons
   *   - barButtons
   */
  static install(config) {
    return new this(config);
  }

  constructor(config) {
    this._installArcPlugins(config);
    this._installPlugins(config);

    this._configureMenuButtons(config);
    this._configureBarButtons(config);
  }

  // install arc plugins
  _installArcPlugins(config) {
    let plugins = config.arcPlugins && config.arcPlugins();
    if (!plugins) { plugins = DEFAULT_PLUGINS; }

    // register blocks, buttons, and keys
    plugins.forEach( (name) => {
      const found = ArcPlugins.filter((plugin) => plugin.name === name)[0];
      invariant(found, `No ARC plugin exists by the name ${name}`);
      if (found) { this._installPlugin(found.src); }
    });
  }

  // install custom plugins
  _installPlugins(config) {
    let plugins = config.plugins && config.plugins();
    if (!plugins) { return; }

    // register blocks, buttons, and keys
    plugins.forEach( (spec) => {
      const name = spec.name;
      this._installPlugin(spec.src);
    });
  }

  _installPlugin(plugin) {
    plugin.installBlocks && plugin.installBlocks(BlockConfig);
    plugin.installMenuButtons && plugin.installMenuButtons(MenuButtonConfig);
    plugin.installBarButtons && plugin.installBarButtons(BarButtonConfig);
    plugin.installKeys && plugin.installKeys(KeyConfig);
  }

  // config menu buttons
  _configureMenuButtons(config) {
    let buttons = config.menuButtons && config.menuButtons();
    if (!buttons) { buttons = DEFAULT_MENU; }

    // add each button the stack
    buttons.forEach( (button) => {
      // console.log('install menu: ', button);
    });
  }

  // config bar buttons
  _configureBarButtons(config) {
    let buttons = config.barButtons && config.barButtons();
    if (!buttons) { buttons = DEFAULT_BAR; }

    // add each button the stack
    buttons.forEach( (button) => {
      // console.log('install bar: ', button);
    });
  }
}

export default ConfigManager;
