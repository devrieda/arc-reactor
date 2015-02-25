var React = require('react/addons');
var Button = require('../../mixins/Button');

var { string } = React.PropTypes;

var H3Button = React.createClass({
  mixins: [Button],

  propTypes: {
    type: string,
    text: string,
    icon: string
  },

  getDefaultProps() {
    return {
      type: "h4",
      text: "H3",
      icon: null
    }
  },

  isActive(content, selection) {
    return false;
  },

  handlePress(content, selection) {
    console.log('press h3');
  }
});

module.exports = H3Button;
