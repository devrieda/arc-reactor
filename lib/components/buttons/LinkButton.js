var React = require('react/addons');
var Button = require('../../mixins/Button');

var { string } = React.PropTypes;

var LinkButton = React.createClass({
  mixins: [Button],

  propTypes: {
    type: string,
    text: string,
    icon: string
  },

  getDefaultProps() {
    return {
      type: "a",
      text: "Link",
      icon: "fa-link"
    }
  },

  isActive(content, selection) {
    return false;
  },

  handlePress(content, selection, value) {
    console.log('press link: ' + value);
  }
});

module.exports = LinkButton;
