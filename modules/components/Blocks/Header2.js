const React = require('react/addons');
const BaseBlock = require('./BaseBlock');

const Header2 = React.createClass({
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

module.exports = Header2;
