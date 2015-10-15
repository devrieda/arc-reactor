import React from 'react/addons';
import BaseBlock from '../../components/Blocks/BaseBlock';
import './Code.scss';

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
