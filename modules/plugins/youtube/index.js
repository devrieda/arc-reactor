import Block from "./YouTube";
import ReturnKey from "./YouTubeReturnKey";
import './YouTube.scss';

// figure
import BspaceKey from '../shared/FigureBspaceKey';
import DeleteKey from '../shared/FigureDeleteKey';
import '../shared/Figure.scss';
import '../shared/FigCaption.scss';

const Plugin = {
  installBlocks(config) {
    config.use(Block);
  },

  installKeys(config) {
    config.use(ReturnKey, { before: 'return' });
    config.use(BspaceKey, { before: 'bspace' });
    config.use(DeleteKey, { before: 'delete' });
  },
};

export default Plugin;
