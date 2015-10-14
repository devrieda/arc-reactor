import React from 'react/addons';
import BaseBlock from './BaseBlock';

const Blockquote = React.createClass({
  propTypes: BaseBlock.propTypes,

  statics: {
    getName: () => "blockquote",
    matches: (block) => {
      return block.get('type') === 'blockquote';
    }
  },

  render() {
    return <BaseBlock {...this.props} />;
  }
});

export default Blockquote;
