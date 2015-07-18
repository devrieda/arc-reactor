var React = require('react/addons');
var BaseBlock = require('./BaseBlock');

var Code = React.createClass({
  propTypes: BaseBlock.propTypes,

  statics: {
    matches: (block) => {
      return block.get('type') === 'pre';
    }
  },

  render() {
    <BaseBlock {...props} />
  }
});

module.exports = Code;
