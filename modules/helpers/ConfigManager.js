import invariant from "react/lib/warning";
import BlockConfig from './Config/BlockConfig';
import MenuButtonConfig from './Config/MenuButtonConfig';
import BarButtonConfig from './Config/BarButtonConfig';
import KeyConfig from './Config/KeyConfig';

// arc internal plugins
import H1Plugin from '../plugins/h1';
import QuotePlugin from '../plugins/quote';
import CodePlugin from '../plugins/code';

const DEFAULT_PLUGINS = [
  { name: 'h1', src: H1Plugin },
  { name: 'quote', src: QuotePlugin },
  { name: 'code', src: CodePlugin },
];

const DEFAULT_MENU = [
  "bold", "italic", "h1", "h2", "h3", "center", "quote", "link"
];

const DEFAULT_BAR = [
  "image", "section"
];

class ConfigManager {
  /**
   * Install a new config
   *
   * config:
   *   - plugins
   *   - menuButtons
   *   - barButtons
   */
  static install(config) {
    return new this(config);
  }

  constructor(config) {
    this._installPlugins(config);

    this._configureMenuButtons(config);
    this._configureBarButtons(config);
  }

  // plugins
  _installPlugins(config) {
    let plugins = config.plugins && config.plugins();
    if (!plugins) { plugins = DEFAULT_PLUGINS; }

    // register blocks, buttons, and keys
    plugins.forEach( (spec) => {
      const name = spec.name;
      const src  = spec.src;
      let plugin;

      // assume an arc plugin
      if (!src) {
        const found = DEFAULT_PLUGINS.filter(
          (plugin) => plugin.name === name
        )[0];
        invariant(found, `No ARC plugin exists by the name ${name}`);
        plugin = found.src;
      } else {
        plugin = src;
      }

      plugin.installBlocks && plugin.installBlocks(BlockConfig);
      plugin.installMenuButtons && plugin.installMenuButtons(MenuButtonConfig);
      plugin.installBarButtons && plugin.installBarButtons(BarButtonConfig);
      plugin.installKeys && plugin.installKeys(KeyConfig);
    });
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
