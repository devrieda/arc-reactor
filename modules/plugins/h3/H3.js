import React from 'react';
import BaseBlock from '../../components/BaseBlock';

const Header3 = React.createClass({
  propTypes: BaseBlock.propTypes,

  statics: {
    getName: () => "h3",
    matches: (block) => {
      return block.get('type') === 'h4';
    }
  },

  render() {
    return <BaseBlock {...this.props} />;
  }
});

export default Header3;
