import React from 'react/addons';
import BaseBlock from '../../../components/Blocks/BaseBlock';

const InlineCodeBlock = React.createClass({
  propTypes: BaseBlock.propTypes,

  statics: {
    matches: (block) => {
      return block.get('type') === 'pre';
    }
  },

  render() {
    return <BaseBlock {...this.props} />;
  }
});

export default InlineCodeBlock;
