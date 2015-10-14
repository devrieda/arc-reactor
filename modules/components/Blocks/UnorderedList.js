import React from 'react/addons';
import BaseBlock from './BaseBlock';

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
