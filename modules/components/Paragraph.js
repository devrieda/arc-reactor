import React from 'react';
import BaseBlock from './BaseBlock';

const Paragraph = React.createClass({
  propTypes: BaseBlock.propTypes,

  statics: {
    getName: () => "p",
    matches: (block) => {
      return block.get('type') === 'p';
    }
  },

  render() {
    return <BaseBlock {...this.props} />;
  }
});

export default Paragraph;
