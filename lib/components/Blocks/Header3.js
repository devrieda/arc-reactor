var React = require('react/addons');
var BaseBlock = require('./BaseBlock');

var Header3 = React.createClass({
  propTypes: BaseBlock.propTypes,

  statics: {
    matches: (block) => {
      return block.get('type') === 'h3';
    }
  },

  render() {
    return <BaseBlock {...this.props} />;
  }
});

module.exports = Header3;