var React = require('react/addons');
var Button = require('../../mixins/Button');

var ContentManager = require('../../modules/ContentManager');
var SelectedContent = require('../../modules/SelectedContent');

var { string } = React.PropTypes;

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
    }
  },

  handlePress(e) {
    var guids   = this.props.selection.guids();
    var offsets = this.props.selection.offsets();

    var manager = new ContentManager(this.props.content);
    manager.toggleMarkup(guids, offsets, this.props.type);
    return this.props.content;
  }
});

module.exports = ItalicButton;
