import Paragraph from '../../components/Blocks/Paragraph';

// move to plugins
import Header1 from '../../components/Blocks/Header1';
import Header2 from '../../components/Blocks/Header2';
import Header3 from '../../components/Blocks/Header3';
import Blockquote from '../../components/Blocks/Blockquote';
import List from '../../components/Blocks/List';
import Code from '../../components/Blocks/Code';
import Image from '../../components/Blocks/Image';
import Youtube from '../../components/Blocks/Youtube';

const Blocks = {
  getItems() {
    return [
      Paragraph,
      Header1,
      Header2,
      Header3,
      Blockquote,
      List,
      Image,
      Youtube,
      Code,
    ]
  }
};

export default Blocks;
