import Config from './Config';

// default blocks
import Paragraph from '../../components/Blocks/Paragraph';

const defaults = [ Paragraph ];

const BlockConfig = Config({
  getInitialItems() {
    return defaults.slice(0);
  }
});

export default BlockConfig;
