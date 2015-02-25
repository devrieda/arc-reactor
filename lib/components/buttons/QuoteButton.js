var React = require('react/addons');
var Button = require('../../mixins/Button.js');

var QuoteButton = React.createClass({
  mixins: [Button],

  getDefaultProps() {
    return {
      type: "blockquote",
      text: "Quote",
      icon: "fa-quote-left"
    }
  },

  isActive(content, selection) {
    return false;
  },

  handlePress(content, selection) {
    console.log('press quote');
  }
});

module.exports = QuoteButton;
