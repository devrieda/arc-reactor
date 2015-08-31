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
    return <BaseBlock {...this.props} />;
  }
});

module.exports = Blockquote;