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
    return <BaseBlock {...this.props} />;
  }
});

module.exports = Code;
