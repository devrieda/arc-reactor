var React = require('react/addons');
var Button = require('../../mixins/Button.js');

var { string } = React.PropTypes;

var H1Button = React.createClass({
  mixins: [Button],

  propTypes: {
    type: string,
    text: string,
    icon: string
  },

  getDefaultProps() {
    return {
      type: "h2",
      text: "H1",
      icon: null
    }
  },

  isActive(content, selection) {
    return false;
  },

  handlePress(content, selection) {
    console.log('press h1');
  }
});

module.exports = H1Button;
