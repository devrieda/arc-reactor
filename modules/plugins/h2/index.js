import Block from "./H2";
import Key from "./H2Key";
import Button from "./H2Button";
import './H2.scss';

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
