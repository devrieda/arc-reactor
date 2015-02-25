var React = require('react/addons');
var Button = require('../../mixins/Button.js');

var CenterButton = React.createClass({
  mixins: [Button],

  propTypes: {
    type: string,
    text: string,
    icon: string
  },

  getDefaultProps() {
    return {
      type: "center",
      text: "Center",
      icon: "fa-align-center"
    }
  },

  isActive(content, selection) {
    return false;
  },

  handlePress(content, selection) {
    console.log('press center');
  }
});

module.exports = CenterButton;
