const _blocks      = [];
const _keys        = [];
const _barButtons  = [];
const _menuButtons = [];

const PluginManager = {
  install(plugin) {
    this._installBlocks(plugin.getBlocks());
    this._installKeys(plugin.getKeys());
    this._installBarButtons(plugin.getBarButtons());
    this._installMenuButtons(plugin.getMenuButtons());
  },

  _installBlocks(blocks) {
  },

  _installKeys(keys) {
  },

  _installBarButtons(buttons) {
  },

  _installMenuButtons(buttons) {
  }
};

module.exports = PluginManager;
