var React = require('react/addons');
var Button = require('../../mixins/Button');

var ToggleMarkup = require('../../modules/Manipulation/ToggleMarkup');

var LinkButton = React.createClass({
  mixins: [Button],

  statics: {
    isVisible: () => true,
  },

  getDefaultProps() {
    return {
      type: "a",
      text: "Link",
      icon: "fa-link",
      hasValue: true
    };
  },

  handlePress(_e, value) {
    var guids   = this.props.selection.guids();
    var offsets = this.props.selection.offsets();

    this._toggleMarkup().execute(guids, offsets, { type: this.props.type, value: value });
    return this.props.content;
  },

  _toggleMarkup() {
    return new ToggleMarkup(this.props.content);
  }
});

module.exports = LinkButton;
