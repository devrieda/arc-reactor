var React = require('react/addons');
var { fromJS } = require('immutable');
var Button = require('../../mixins/Button');

var ToggleBlockType = require('../../modules/Manipulation/ToggleBlockType');

var H1Button = React.createClass({
  mixins: [Button],

  statics: {
    isVisible: () => true
  },

  getDefaultProps() {
    return {
      type: "h2",
      text: "H1",
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
    var map = fromJS(this.props.content);
    return new ToggleBlockType(map);
  }
});

module.exports = H1Button;
