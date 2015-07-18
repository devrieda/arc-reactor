var React = require('react/addons');
var BaseBlock = require('./BaseBlock');

var Header2 = React.createClass({
  propTypes: BaseBlock.propTypes,

  statics: {
    matches: (block) => {
      return block.get('type') === 'h2';
    }
  },

  render() {
    <BaseBlock {...props} />
  }
});

module.exports = Header2;
