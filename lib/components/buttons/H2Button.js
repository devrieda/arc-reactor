var React = require('react/addons');
var Button = require('../../mixins/Button');

var ToggleBlockType = require('../../modules/Manipulation/ToggleBlockType');

var H2Button = React.createClass({
  mixins: [Button],

  statics: {
    isVisible: () => true
  },

  getDefaultProps() {
    return {
      type: "h3",
      text: "H2",
      icon: null
    };
  },

  handlePress() {
    var guids   = this.props.selection.guids();
    var offsets = this.props.selection.offsets();

    this._toggleBlockType().execute(guids, offsets, { type: this.props.type });
    return this.props.content;
  },

  _toggleBlockType() {
    return new ToggleBlockType(this.props.content);
  }
});

module.exports = H2Button;
