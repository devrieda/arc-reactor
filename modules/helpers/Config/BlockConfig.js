import Config from './Config';

// default blocks
import Paragraph from '../../components/Blocks/Paragraph';
import UnorderedList from '../../components/Blocks/UnorderedList';
import OrderedList from '../../components/Blocks/OrderedList';

const defaults = [
  Paragraph,
  UnorderedList,
  OrderedList,
];

const BlockConfig = Config({
  getInitialItems() {
    return defaults.slice(0);
  }
});

export default BlockConfig;
