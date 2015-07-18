var React = require('react/addons');
var MenuButton = require('../MenuButton');

var History = require('../../modules/History');
var ToggleMarkup = require('../../modules/Manipulation/ToggleMarkup');
var EditorStore = require('../../stores/EditorStore');

var LinkButton = React.createClass({
  statics: {
    isVisible: () => true,
  },

  propTypes: MenuButton.propTypes,

  getDefaultProps() {
    return {
      type: "a",
      text: "Link",
      icon: "fa-link",
      hasValue: true
    };
  },

  setValue(value) {
    var content = this.handlePress(value || "");
    EditorStore.set({content: content});
  },

  handlePress(value) {
    value = value || "";
    var guids   = this.props.selection.guids();
    var offsets = this.props.selection.offsets();
    var position = this.props.selection.position();

    if (value && !value.match(/^http/)) { value = "http://" + value; }

    var options = { type: this.props.type, value: value };
    var result = this._toggleMarkup().execute(guids, offsets, options);

    // track content state and where cursor is
    History.getInstance().push({content: result.content, position: position});

    return result.content;
  },

  _toggleMarkup() {
    return new ToggleMarkup(this.props.content);
  },

  render() {
    return (
      <MenuButton {...this.props}
        onPress={this.handlePress}
        onSetValue={this.props.onSetValue}
      />
    );
  }
});

module.exports = LinkButton;
