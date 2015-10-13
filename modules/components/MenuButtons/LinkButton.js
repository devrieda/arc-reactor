const React = require('react/addons');
const MenuButton = require('../MenuButton');

const ToggleMarkup = require('../../helpers/Manipulation/ToggleMarkup');
const EditorStore = require('../../stores/EditorStore');

const LinkButton = React.createClass({
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
    const { content } = this.handlePress(value || "");
    EditorStore.set({content: content});
  },

  handlePress(value) {
    value = value || "";
    const guids   = this.props.selection.guids();
    const offsets = this.props.selection.offsets();
    const position = this.props.selection.position();

    if (value && !value.match(/^http/)) { value = "http://" + value; }

    const options = { type: this.props.type, value: value };
    const result = this._toggleMarkup().execute(guids, offsets, options);

    return { content: result.content, position: position };
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

export default LinkButton;
