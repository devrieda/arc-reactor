import Config from './Config';

// default blocks
import Paragraph from '../../components/Blocks/Paragraph';
import UnorderedList from '../../components/Blocks/UnorderedList';
import OrderedList from '../../components/Blocks/OrderedList';
import Image from '../../components/Blocks/Image';
import Youtube from '../../components/Blocks/Youtube';

const defaults = [
  Paragraph,
  UnorderedList,
  OrderedList,
  Image,
  Youtube,
];

const BlockConfig = Config({
  getInitialItems() {
    return defaults.slice(0);
  }
});

export default BlockConfig;
