var React = require('react/addons');
require('../stylesheets/MenuItem.scss');

var classSet = React.addons.classSet;

var MenuItem = React.createClass({
  propTypes: {
    type: React.PropTypes.string,
    text: React.PropTypes.string,
    icon: React.PropTypes.string,
    action: React.PropTypes.string,
    selContent: React.PropTypes.object
  },

  getDefaultProps() {
    return { 
      type: '',
      text: '',
      icon: null,
      selContent: {}
    }
  },

  isActive() {
    var selContent = this.props.selContent;
    if (this.props.type == 'center') {
      return selContent.isCentered && selContent.isCentered();
    } else {
      return selContent.hasType && selContent.hasType(this.props.type);
    }
  },

  itemClasses() {
    var itemClass = {
      'ic-Editor-MenuItem': true,
      'ic-Editor-MenuItem--active': this.isActive()
    }
    itemClass[`ic-Editor-MenuItem--${this.props.type}`] = true;
    return classSet(itemClass);
  },

  buttonClasses() {
    return classSet({
      'ic-Editor-MenuItem__button': true,
      'ic-Editor-MenuItem__button--active': this.isActive()
    });
  },

  iconClasses() {
    var iconClass = {
      'ic-Editor-MenuItem__icon': true,
      'ic-Editor-MenuItem__icon--active': this.isActive(),
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
