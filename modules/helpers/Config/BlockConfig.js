import Config from './Config';

// default blocks
import Paragraph from '../../components/Blocks/Paragraph';
import Header1 from '../../components/Blocks/Header1';
import Header2 from '../../components/Blocks/Header2';
import Header3 from '../../components/Blocks/Header3';
import Blockquote from '../../components/Blocks/Blockquote';
import UnorderedList from '../../components/Blocks/UnorderedList';
import OrderedList from '../../components/Blocks/OrderedList';
import Code from '../../components/Blocks/Code';
import Image from '../../components/Blocks/Image';
import Youtube from '../../components/Blocks/Youtube';

const defaults = [
  Paragraph,
  Header1,
  Header2,
  Header3,
  Blockquote,
  UnorderedList,
  OrderedList,
  Image,
  Youtube,
  Code,
];

const BlockConfig = Config({
  getInitialItems() {
    return defaults.slice(0);
  }
});

export default BlockConfig;
