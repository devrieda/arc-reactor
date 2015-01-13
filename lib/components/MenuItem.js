var React = require('react/addons');
require('../stylesheets/MenuItem.scss');

var classSet = React.addons.classSet;

var MenuItem = React.createClass({
  propTypes: {
    type: React.PropTypes.string,
    text: React.PropTypes.string,
    icon: React.PropTypes.string,
    action: React.PropTypes.string,
    active: React.PropTypes.bool
  },

  getDefaultProps() {
    return { 
      type: '',
      text: '',
      icon: null,
      active: false
    }
  },

  itemClasses() {
    var itemClass = {
      'ic-Editor-MenuItem': true,
      'ic-Editor-MenuItem--active': this.props.active
    }
    itemClass[`ic-Editor-MenuItem--${this.props.type}`] = true;
    return classSet(itemClass);
  },

  buttonClasses() {
    return classSet({
      'ic-Editor-MenuItem__button': true,
      'ic-Editor-MenuItem__button--active': this.props.active,
    });
  },

  iconClasses() {
    var iconClass = {
      'ic-Editor-MenuItem__icon': true,
      'ic-Editor-MenuItem__icon--active': this.props.active,
      'fa': true
    }
    iconClass[this.props.icon] = true;
    return classSet(iconClass);
  },

  textClasses() {
    var screenreader = ['h2', 'h3', 'h4'].indexOf(this.props.type) == -1;
    return classSet({
      'ic-Editor-MenuItem__icon-text': true,
      'ic-Editor-MenuItem__icon-text--sr': screenreader
    });
  },

  render() {
    return (
      <li className={this.itemClasses()} key={this.props.type}>
        <button className={this.buttonClasses()} data-action={this.props.action}>
          <i className={this.iconClasses()}></i>
          <span className={this.textClasses()}>{this.props.text}</span>
        </button>
      </li>
    )
  }
});

module.exports = MenuItem;
