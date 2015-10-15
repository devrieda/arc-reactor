import Block from "./Code";
import Key   from "./CodeKey";

const Plugin = {
  installBlocks(config) {
    config.use(Block);
  },

  installKeys(config) {
    config.use(Key);
  },
};

export default Plugin;
