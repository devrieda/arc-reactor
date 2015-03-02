var React = require('react/addons');
var Button = require('../../mixins/Button');

var ContentManager = require('../../modules/ContentManager');

var { string } = React.PropTypes;

var QuoteButton = React.createClass({
  mixins: [Button],

  statics: {
    isVisible: (content, selection) => true
  },

  propTypes: {
    type: string,
    text: string,
    icon: string
  },

  getDefaultProps() {
    return {
      type: "blockquote",
      text: "Quote",
      icon: "fa-quote-left"
    }
  },

  handlePress(e) {
    var guids   = this.props.selection.guids();
    var offsets = this.props.selection.offsets();

    var manager = new ContentManager(this.props.content);
    manager.toggleBlockType(guids, offsets, this.props.type);
    return this.props.content;
  }
});

module.exports = QuoteButton;
