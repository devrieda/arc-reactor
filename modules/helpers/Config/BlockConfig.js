import Config from './Config';

// default blocks
import Paragraph from '../../components/Blocks/Paragraph';
import Header2 from '../../components/Blocks/Header2';
import Header3 from '../../components/Blocks/Header3';
import UnorderedList from '../../components/Blocks/UnorderedList';
import OrderedList from '../../components/Blocks/OrderedList';
import Image from '../../components/Blocks/Image';
import Youtube from '../../components/Blocks/Youtube';

const defaults = [
  Paragraph,
  Header2,
  Header3,
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
