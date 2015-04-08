var React = require('react/addons');
var Immutable = require('immutable');
var Button = require('../../mixins/Button');

var ToggleCenter = require('../../modules/Manipulation/ToggleCenter');

var CenterButton = React.createClass({
  mixins: [Button],

  statics: {
    isVisible: () => true
  },

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

    var result = this._toggleCenter().execute(guids, offsets);
    return result.content;
  },

  _toggleCenter() {
    var map = Immutable.fromJS(this.props.content);
    return new ToggleCenter(map);
  }
});

module.exports = CenterButton;
