var React = require('react/addons');
var Immutable = require('immutable');
var Button = require('../../mixins/Button');

var ToggleMarkup    = require('../../modules/Manipulation/ToggleMarkup');
var SelectedContent = require('../../modules/SelectedContent');

var BoldButton = React.createClass({
  mixins: [Button],

  statics: {
    isVisible: (content, selection) => {
      var selContent = new SelectedContent(selection, content);
      return !selContent.isHeader();
    }
  },

  getDefaultProps() {
    return {
      type: "strong",
      text: "Bold",
      icon: "fa-bold"
    };
  },

  handlePress() {
    var guids   = this.props.selection.guids();
    var offsets = this.props.selection.offsets();

    var result = this._toggleMarkup().execute(guids, offsets, { type: this.props.type });
    return result.content;
  },

  _toggleMarkup() {
    var map = Immutable.fromJS(this.props.content);
    return new ToggleMarkup(map);
  }
});

module.exports = BoldButton;
