var React = require('react/addons');
var Button = require('../../mixins/Button');

var ContentManager = require('../../modules/ContentManager');

var LinkButton = React.createClass({
  mixins: [Button],

  statics: {
    isVisible: () => true,
  },

  getDefaultProps() {
    return {
      type: "a",
      text: "Link",
      icon: "fa-link",
      hasValue: true
    };
  },

  handlePress(_e, value) {
    var guids   = this.props.selection.guids();
    var offsets = this.props.selection.offsets();

    var manager = new ContentManager(this.props.content);
    manager.toggleMarkup(guids, offsets, this.props.type, value);
    return this.props.content;
  }
});

module.exports = LinkButton;
