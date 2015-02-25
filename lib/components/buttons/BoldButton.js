var React = require('react/addons');
var Button = require('../../mixins/Button.js');

var { string } = React.PropTypes;

var BoldButton = React.createClass({
  mixins: [Button],

  propTypes: {
    type: string,
    text: string,
    icon: string
  },

  getDefaultProps() {
    return {
      type: "strong",
      text: "Bold",
      icon: "fa-bold"
    }
  },

  isActive(content, selection) {
    return false;
  },

  handlePress(content, selection) {
    console.log('press bold');
  }
});

module.exports = BoldButton;
