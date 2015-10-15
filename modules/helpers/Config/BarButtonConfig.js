import Config from './Config';

const defaults = [];

const BarButtonConfig = Config({
  getInitialItems() {
    return defaults.slice(0);
  }
});

export default BarButtonConfig;
