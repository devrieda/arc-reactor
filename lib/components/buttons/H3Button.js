var React = require('react/addons');
var Immutable = require('immutable');
var Button = require('../../mixins/Button');

var ToggleBlockType = require('../../modules/Manipulation/ToggleBlockType');

var H3Button = React.createClass({
  mixins: [Button],

  statics: {
    isVisible: () => true
  },

  getDefaultProps() {
    return {
      type: "h4",
      text: "H3",
      icon: null
    };
  },

  handlePress() {
    var guids   = this.props.selection.guids();
    var offsets = this.props.selection.offsets();

    var result = this._toggleBlockType().execute(guids, offsets, { type: this.props.type });
    return result.content;
  },

  _toggleBlockType() {
    var map = Immutable.fromJS(this.props.content);
    return new ToggleBlockType(map);
  }
});

module.exports = H3Button;
