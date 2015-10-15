import Block from "./YouTube";
import ReturnKey from "./YouTubeReturnKey";
import './YouTube.scss';
import '../shared/Figure.scss';
import '../shared/FigCaption.scss';

const Plugin = {
  installBlocks(config) {
    config.use(Block);
  },

  installKeys(config) {
    config.use(ReturnKey, { before: 'return' });
  },
};

export default Plugin;
