import Block from "./Code";
import Key from "./CodeKey";
import CodeReturnKey from "./CodeReturnKey";
import './Code.scss';

const Plugin = {
  installBlocks(config) {
    config.use(Block);
  },

  installKeys(config) {
    config.use(Key);
    config.use(CodeReturnKey, { before: 'return' });
  },
};

export default Plugin;
