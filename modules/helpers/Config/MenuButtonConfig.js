import Config from './Config';

const defaults = [];

const MenuButtonConfig = Config({
  getInitialItems() {
    return defaults.slice(0);
  }
});

export default MenuButtonConfig;
