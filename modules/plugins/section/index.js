import Button from './SectionButton';
import Key from './SectionKey';

const Plugin = {
  installBarButtons(config) {
    config.use(Button);
  },
  installKeys(config) {
    config.use(Key, { before: 'return' });
  },
};

export default Plugin;
