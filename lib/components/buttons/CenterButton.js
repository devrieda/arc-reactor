var React = require('react/addons');
var Button = require('../../mixins/Button');

var ContentManager = require('../../modules/ContentManager');

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

    var manager = new ContentManager(this.props.content);
    manager.toggleCenter(guids, offsets);
    return this.props.content;
  }
});

module.exports = CenterButton;
