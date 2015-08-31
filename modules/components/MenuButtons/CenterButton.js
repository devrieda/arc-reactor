var React = require('react/addons');
var MenuButton = require('../MenuButton');

var History = require('../../helpers/History');
var ToggleCenter = require('../../helpers/Manipulation/ToggleCenter');

var CenterButton = React.createClass({
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
    var guids   = this.props.selection.guids();
    var offsets = this.props.selection.offsets();
    var position = this.props.selection.position();

    var result = this._toggleCenter().execute(guids, offsets);

    // track content state and where cursor is
    History.getInstance().push({content: result.content, position: position});

    return result.content;
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