const React = require('react/addons');
const BaseBlock = require('../../../components/Blocks/BaseBlock');

const InlineCodeBlock = React.createClass({
  propTypes: BaseBlock.propTypes,

  statics: {
    matches: (block) => {
      return block.get('type') === 'pre';
    }
  },

  render() {
    return <BaseBlock {...this.props} />;
  }
});

module.exports = InlineCodeBlock;
