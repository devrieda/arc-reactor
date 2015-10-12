const React = require('react/addons');
const BaseBlock = require('./BaseBlock');

const Blockquote = React.createClass({
  propTypes: BaseBlock.propTypes,

  statics: {
    matches: (block) => {
      return block.get('type') === 'blockquote';
    }
  },

  render() {
    return <BaseBlock {...this.props} />;
  }
});

module.exports = Blockquote;
