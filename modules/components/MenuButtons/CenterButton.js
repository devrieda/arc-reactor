const React = require('react/addons');
const MenuButton = require('../MenuButton');

const ToggleCenter = require('../../helpers/Manipulation/ToggleCenter');

const CenterButton = React.createClass({
  statics: {
    isVisible: () => true
  },

  propTypes: MenuButton.propTypes,

  getDefaultProps() {
    return {
      type: "center",
      text: "Center",
      icon: "fa-align-center"
    };
  },

  handlePress() {
    const guids   = this.props.selection.guids();
    const offsets = this.props.selection.offsets();
    const position = this.props.selection.position();

    const result = this._toggleCenter().execute(guids, offsets);

    return { content: result.content, position: position };
  },

  _toggleCenter() {
    return new ToggleCenter(this.props.content);
  },

  render() {
    return (
      <MenuButton {...this.props} onPress={this.handlePress} />
    );
  }
});

module.exports = CenterButton;
