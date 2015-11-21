import React from 'react';
import BaseBlock from '../../components/BaseBlock';

const Code = React.createClass({
  propTypes: BaseBlock.propTypes,

  statics: {
    getName: () => "code",
    matches: (block) => {
      return block.get('type') === 'pre';
    }
  },

  render() {
    return <BaseBlock {...this.props} />;
  }
});

export default Code;
