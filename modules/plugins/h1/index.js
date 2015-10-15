import Block from "./H1";
import Key from "./H1Key";
import Button from "./H1Button";
import './H1.scss';

const Plugin = {
  installBlocks(config) {
    config.use(Block);
  },

  installKeys(config) {
    config.use(Key);
  },

  installMenuButtons(config) {
    config.use(Button);
  }
};

export default Plugin;
