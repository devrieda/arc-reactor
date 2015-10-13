import React from 'react/addons';
import BaseBlock from './BaseBlock';

const Header3 = React.createClass({
  propTypes: BaseBlock.propTypes,

  statics: {
    matches: (block) => {
      return block.get('type') === 'h3';
    }
  },

  render() {
    return <BaseBlock {...this.props} />;
  }
});

export default Header3;
