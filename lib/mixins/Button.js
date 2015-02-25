var React = require('react/addons');
var classSet = React.addons.classSet;

require('../stylesheets/Button.scss');

var ButtonMixin = {
  isVisible(content, selection) {
    return true;
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
      'ic-Editor-Button': true,
      'ic-Editor-Button--active': this.props.active,
    });
  },

  iconClasses() {
    var iconClass = {
      'ic-Editor-Button__icon': true,
      'ic-Editor-Button__icon--active': this.props.active,
      'fa': true
    }
    iconClass[this.props.icon] = true;
    return classSet(iconClass);
  },

  textClasses() {
    return classSet({
      'ic-Editor-Button__icon-text': true,
      'ic-Editor-Button__icon-text--sr': this.props.icon
    });
  },

  render() {
    return (
      <button className={this.buttonClasses()} data-action={this.props.action}>
        <i className={this.iconClasses()}></i>
        <span className={this.textClasses()}>{this.props.text}</span>
      </button>
    )
  }
};

module.exports = ButtonMixin;
