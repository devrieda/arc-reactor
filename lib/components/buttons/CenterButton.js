var React = require('react/addons');
var Button = require('../../mixins/Button');

var History = require('../../modules/History');
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
    var position = this.props.selection.position();

    var result = this._toggleCenter().execute(guids, offsets);

    // track content state and where cursor is
    History.getInstance().push({content: result.content, position: position});

    return result.content;
  },

  _toggleCenter() {
    return new ToggleCenter(this.props.content);
  }
});

module.exports = CenterButton;
