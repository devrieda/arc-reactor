var React = require('react/addons');
var MenuButton = require('../MenuButton');

var History = require('../../helpers/History');
var ToggleMarkup    = require('../../helpers/Manipulation/ToggleMarkup');
var SelectedContent = require('../../helpers/SelectedContent');

var ItalicButton = React.createClass({
  statics: {
    isVisible: (content, selection) => {
      var selContent = new SelectedContent(selection, content);
      return !selContent.isHeader();
    }
  },

  getDefaultProps() {
    return {
      type: "em",
      text: "Italic",
      icon: "fa-italic"
    };
  },

  handlePress() {
    var guids   = this.props.selection.guids();
    var offsets = this.props.selection.offsets();
    var position = this.props.selection.position();

    var result = this._toggleMarkup().execute(guids, offsets, { type: this.props.type });

    // track content state and where cursor is
    History.getInstance().push({content: result.content, position: position});

    return result.content;
  },

  _toggleMarkup() {
    return new ToggleMarkup(this.props.content);
  },

  render() {
    return (
      <MenuButton {...this.props} onPress={this.handlePress} />
    );
  }
});

module.exports = ItalicButton;