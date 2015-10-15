import React from 'react';
import BaseBlock from '../../components/Blocks/BaseBlock';
import './H2.scss';

const Header2 = React.createClass({
  propTypes: BaseBlock.propTypes,

  statics: {
    getName: () => "h2",
    matches: (block) => {
      return block.get('type') === 'h3';
    }
  },

  render() {
    return <BaseBlock {...this.props} />;
  }
});

export default Header2;
