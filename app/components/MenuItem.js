/** @jsx React.DOM */

var React = require('react/addons');
require('../stylesheets/MenuItem.scss');

var classSet = React.addons.classSet;

var MenuItem = React.createClass({
  propTypes: {
    type: React.PropTypes.string,
    text: React.PropTypes.string,
    icon: React.PropTypes.string,
    selection: React.PropTypes.object
  },

  getDefaultProps: function() {
    return { 
      type: '',
      text: '',
      icon: null,
      selection: {}
    }
  },

  isActive: function() {
    if (this.props.type == 'center') {
      return this.props.selection.centered;
    } else {
      var types = this.props.selection.types;
      return types && types.indexOf(this.props.type) != -1;
    }
  },

  itemClasses: function() {
    var itemClass = {
      'ic-Editor-MenuItem': true,
      'ic-Editor-MenuItem--active': this.isActive()
    }
    itemClass['ic-Editor-MenuItem--'+this.props.type] = true;
    return classSet(itemClass);
  },

  buttonClasses: function() {
    return classSet({
      'ic-Editor-MenuItem__button': true,
      'ic-Editor-MenuItem__button--active': this.isActive()
    });
  },

  iconClasses: function() {
    var iconClass = {
      'ic-Editor-MenuItem__icon': true,
      'ic-Editor-MenuItem__icon--active': this.isActive(),
      'fa': true
    }
    iconClass[this.props.icon] = true;
    return classSet(iconClass);
  },

  textClasses: function() {
    return classSet({ 
      'ic-Editor-MenuItem__icon-text': true,
      'screenreader-only': ['h2', 'h3', 'h4'].indexOf(this.props.type) == -1
    });
  },

  render: function() {
    return (
      <li className={this.itemClasses()} key={this.props.type}>
        <button className={this.buttonClasses()} data-action={this.props.type}>
          <i className={this.iconClasses()}></i>
          <span className={this.textClasses()}>{this.props.text}</span>
        </button>
      </li>
    )
  }
});

module.exports = MenuItem;
