import React from 'react/addons';
import BaseBlock from '../../components/BaseBlock';

const OrderedList = React.createClass({
  propTypes: BaseBlock.propTypes,

  statics: {
    getName: () => "ol",
    matches: (block) => {
      return block.get('type') === 'ol';
    }
  },

  render() {
    return <BaseBlock {...this.props} />;
  }
});

export default OrderedList;
