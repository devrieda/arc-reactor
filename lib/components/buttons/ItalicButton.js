var React = require('react/addons');
var Button = require('../../mixins/Button.js');

var ItalicButton = React.createClass({
  mixins: [Button],

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
