var React = require('react/addons');
var Button = require('../../mixins/Button');

var History = require('../../modules/History');
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
    var position = this.props.selection.position();

    var result = this._toggleBlockType().execute(guids, offsets, { type: this.props.type });

    // track content state and where cursor is
    History.getInstance().push({content: result.content, position: position});

    return result.content;
  },

  _toggleBlockType() {
    return new ToggleBlockType(this.props.content);
  }
});

module.exports = H2Button;
