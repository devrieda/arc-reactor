var React = require('react/addons');
var BaseBlock = require('./BaseBlock');

var Paragraph = React.createClass({
  propTypes: BaseBlock.propTypes,

  statics: {
    matches: (block) => {
      return block.get('type') === 'p';
    }
  },

  render() {
    <BaseBlock {...props} />
  }
});

module.exports = Paragraph;
