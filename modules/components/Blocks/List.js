const React = require('react/addons');
const BaseBlock = require('./BaseBlock');

const List = React.createClass({
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
