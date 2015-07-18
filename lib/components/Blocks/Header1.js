var React = require('react/addons');
var BaseBlock = require('./BaseBlock');

var Header1 = React.createClass({
  propTypes: BaseBlock.propTypes,

  statics: {
    matches: (block) => {
      return block.get('type') === 'h2';
    }
  },

  render() {
    return <BaseBlock {...this.props} />;
  }
});

module.exports = Header1;
