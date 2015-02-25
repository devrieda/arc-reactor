var React = require('react/addons');
var Button = require('../../mixins/Button');

var { string } = React.PropTypes;

var ItalicButton = React.createClass({
  mixins: [Button],

  propTypes: {
    type: string,
    text: string,
    icon: string
  },

  getDefaultProps() {
    return {
      type: "em",
      text: "Italic",
      icon: "fa-italic"
    }
  },

  isActive(content, selection) {
    return false;
  },

  handlePress(content, selection) {
    console.log('press italic');
  }
});

module.exports = ItalicButton;
