/** @jsx React.DOM */

var React = require('react/addons');
var classSet = React.addons.classSet;
require('../stylesheets/MenuItem.css');

var MenuItem = React.createClass({
  propTypes: {
    type: React.PropTypes.string,
    text: React.PropTypes.string,
    icon: React.PropTypes.string,
    active: React.PropTypes.bool
  },

  getDefaultProps: function() {
    return { 
      type: '',
      text: '',
      icon: null,
      active: false
    }
  },
  getInitialState: function() {
    return { active: false }
  },

  componentWillMount: function() {
    this.setState({active: this.props.active});
  },

  render: function() {
    var itemClass = {
      'ic-Editor-MenuItem': true,
      'ic-Editor-MenuItem--active': this.props.active
    }
    itemClass['ic-Editor-MenuItem--'+this.props.type] = true;

    // icon
    var iconClass = { 'ic-Editor-MenuItem__icon': true, 'fa': true }
    iconClass[this.props.icon] = true;

    // text
    var textClass = { 
      'ic-Editor-MenuItem__icon-text': true,
      'screenreader-only': ['h2', 'h3', 'h4'].indexOf(this.props.type) == -1
    }

    return (
      <li className={classSet(itemClass)} key={this.props.type}>
        <button className="ic-Editor-MenuItem__button" data-action={this.props.type}>
          <i className={classSet(iconClass)}></i>
          <span className={classSet(textClass)}>{this.props.text}</span>
        </button>
      </li>
    )
  }
});

module.exports = MenuItem;
