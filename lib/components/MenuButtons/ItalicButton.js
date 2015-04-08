var React = require('react/addons');
var Button = require('../../mixins/Button');

var History = require('../../modules/History');
var ToggleMarkup    = require('../../modules/Manipulation/ToggleMarkup');
var SelectedContent = require('../../modules/SelectedContent');

var ItalicButton = React.createClass({
  mixins: [Button],

  statics: {
    isVisible: (content, selection) => {
      var selContent = new SelectedContent(selection, content);
      return !selContent.isHeader();
    }
  },

  getDefaultProps() {
    return {
      type: "em",
      text: "Italic",
      icon: "fa-italic"
    };
  },

  handlePress() {
    var guids   = this.props.selection.guids();
    var offsets = this.props.selection.offsets();
    var position = this.props.selection.position();

    var result = this._toggleMarkup().execute(guids, offsets, { type: this.props.type });

    // track content state and where cursor is
    History.getInstance().push({content: result.content, position: position});

    return result.content;
  },

  _toggleMarkup() {
    return new ToggleMarkup(this.props.content);
  }
});

module.exports = ItalicButton;
