var React = require('react/addons');
var Button = require('../../mixins/Button');

var ContentManager = require('../../modules/ContentManager');

var { string } = React.PropTypes;

var CenterButton = React.createClass({
  mixins: [Button],

  statics: {
    isVisible: (content, selection) => true
  },

  getDefaultProps() {
    return {
      type: "center",
      text: "Center",
      icon: "fa-align-center"
    }
  },

  handlePress(e) {
    var guids   = this.props.selection.guids();
    var offsets = this.props.selection.offsets();

    var manager = new ContentManager(this.props.content);
    manager.toggleCenter(guids, offsets);
    return this.props.content;
  }
});

module.exports = CenterButton;
