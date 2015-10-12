const React = require('react/addons');
const MenuButton = require('../MenuButton');

const ToggleBlockType = require('../../helpers/Manipulation/ToggleBlockType');

const H3Button = React.createClass({
  statics: {
    isVisible: () => true
  },

  propTypes: MenuButton.propTypes,

  getDefaultProps() {
    return {
      type: "h4",
      text: "H3",
      icon: null
    };
  },

  handlePress() {
    const guids   = this.props.selection.guids();
    const offsets = this.props.selection.offsets();
    const position = this.props.selection.position();

    const result = this._toggleBlockType().execute(guids, offsets, { type: this.props.type });

    return { content: result.content, position: position };
  },

  _toggleBlockType() {
    return new ToggleBlockType(this.props.content);
  },

  render() {
    return (
      <MenuButton {...this.props} onPress={this.handlePress} />
    );
  }
});

module.exports = H3Button;
