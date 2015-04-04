var React = require('react/addons');
var Button = require('../../mixins/Button');

var ContentManager = require('../../modules/ContentManager');

var { string } = React.PropTypes;

var H3Button = React.createClass({
  mixins: [Button],

  statics: {
    isVisible: (content, selection) => true
  },

  getDefaultProps() {
    return {
      type: "h4",
      text: "H3",
      icon: null
    };
  },

  handlePress(e) {
    var guids   = this.props.selection.guids();
    var offsets = this.props.selection.offsets();

    var manager = new ContentManager(this.props.content);
    manager.toggleBlockType(guids, offsets, this.props.type);
    return this.props.content;
  }
});

module.exports = H3Button;
