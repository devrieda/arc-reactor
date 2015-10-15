import Block from "./Image";
import ReturnKey from "./ImageReturnKey";
import './Image.scss';
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
