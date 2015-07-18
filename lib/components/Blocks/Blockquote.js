var React = require('react/addons');
var BaseBlock = require('./BaseBlock');

var Blockquote = React.createClass({
  propTypes: BaseBlock.propTypes,

  statics: {
    matches: (block) => {
      return block.get('type') === 'blockquote';
    }
  },

  render() {
    <BaseBlock {...props} />
  }
});

module.exports = Blockquote;
