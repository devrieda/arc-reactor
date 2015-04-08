var React = require('react/addons');
var Immutable = require('immutable');
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

    var result = this._toggleMarkup().execute(guids, offsets, { type: this.props.type, value: value });
    return result.content;
  },

  _toggleMarkup() {
    var map = Immutable.fromJS(this.props.content);
    return new ToggleMarkup(map);
  }
});

module.exports = LinkButton;
