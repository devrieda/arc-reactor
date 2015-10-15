import Block from "./H3";
import Key from "./H3Key";
import Button from "./H3Button";
import './H3.scss';

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
