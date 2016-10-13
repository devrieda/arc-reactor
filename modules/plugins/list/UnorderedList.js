import React from 'react';
import BaseBlock from '../../components/BaseBlock';

const UnorderedList = React.createClass({
  propTypes: BaseBlock.propTypes,

  statics: {
    getName: () => "ul",
    matches: (block) => {
      return block.get('type') === 'ul';
    }
  },

  render() {
    return <BaseBlock {...this.props} />;
  }
});

export default UnorderedList;
