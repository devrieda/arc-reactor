import Block from "./Code";
import Key   from "./CodeKey";

const Code = {
  installBlocks(config) {
    config.use(Block);
  },

  installKeys(config) {
    config.use(Key);
  },
};

export default Code;
