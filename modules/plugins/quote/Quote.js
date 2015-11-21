import React from 'react';
import BaseBlock from '../../components/BaseBlock';

const Quote = React.createClass({
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

export default Quote;
