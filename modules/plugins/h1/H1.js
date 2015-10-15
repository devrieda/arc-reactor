import React from 'react';
import BaseBlock from '../../components/Blocks/BaseBlock';
 import './H1.scss';

const H1 = React.createClass({
  propTypes: BaseBlock.propTypes,

  statics: {
    getName: () => "h1",
    matches: (block) => {
      return block.get('type') === 'h2';
    }
  },

  render() {
    return <BaseBlock {...this.props} />;
  }
});

export default H1;
