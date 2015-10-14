import React from 'react/addons';
import BaseBlock from './BaseBlock';

const Header2 = React.createClass({
  propTypes: BaseBlock.propTypes,

  statics: {
    getName: () => "h2",
    matches: (block) => {
      return block.get('type') === 'h2';
    }
  },

  render() {
    return <BaseBlock {...this.props} />;
  }
});

export default Header2;
