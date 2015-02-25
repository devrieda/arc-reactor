var React = require('react/addons');
var Button = require('../../mixins/Button');

var { string } = React.PropTypes;

var H2Button = React.createClass({
  mixins: [Button],

  propTypes: {
    type: string,
    text: string,
    icon: string
  },

  getDefaultProps() {
    return {
      type: "h3",
      text: "H2",
      icon: null
    }
  },

  isActive(content, selection) {
    return false;
  },

  handlePress(content, selection) {
    console.log('press h2');
  }
});

module.exports = H2Button;
