var React = require('react/addons');
var BaseBlock = require('./BaseBlock');

var List = React.createClass({
  propTypes: BaseBlock.propTypes,

  statics: {
    matches: (block) => {
      return block.get('type') === 'ul';
    }
  },

  render() {
    return <BaseBlock {...this.props} />;
  }
});

module.exports = List;
