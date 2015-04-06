var React = require('react/addons');
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

    this._toggleMarkup().execute(guids, offsets, { type: this.props.type });
    return this.props.content;
  },

  _toggleMarkup() {
    return new ToggleMarkup(this.props.content);
  }
});

module.exports = BoldButton;
