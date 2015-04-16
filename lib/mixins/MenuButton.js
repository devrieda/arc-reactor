var React = require('react/addons');
var Immutable = require('immutable');
var cx = require("classnames");
var SelectedContent = require('../modules/SelectedContent');
var EditorStore = require('../stores/EditorStore');

var { string, bool, object, func, instanceOf } = React.PropTypes;

var MenuButtonMixin = {
  propTypes: {
    type: string,
    text: string,
    icon: string,
    hasValue: bool,
    content: instanceOf(Immutable.Map),
    selection: object,
    handleSetValue: func
  },

  getDefaultProps() {
    return {
      content: Immutable.Map(),
      selection: {},
      handleSetValue: () => {}
    };
  },

  handleClick(e, _reactid, value) {
    // make sure to always pass a value if we need one
    if (this.props.hasValue) { value = value || ""; }

    // if the button needs a value and we don't have it yet
    if (this.props.hasValue && !value && !this.isActive()) {
      this.props.handleSetValue(this);

    // we have a value to set
    } else {
      var content = this.handlePress(value);
      EditorStore.set({content: content});
    }
  },

  isActive() {
    var selContent = new SelectedContent(
      this.props.selection, this.props.content
    );
    return selContent.isActive(this.props.type, this.props.hasValue);
  },

  buttonClasses(active) {
    var classes = {
      'ic-Editor-MenuButton': true,
      'ic-Editor-MenuButton--active': active,
    };
    classes[`ic-Editor-MenuButton--${this.props.type}`] = true;
    return cx(classes);
  },

  iconClasses(active) {
    var iconClass = {
      'ic-Editor-MenuButton__icon fa': true,
      'ic-Editor-MenuButton__icon--active': active,
    };
    iconClass[this.props.icon] = true;
    return cx(iconClass);
  },

  textClasses() {
    return cx({
      'ic-Editor-MenuButton__icon-text': true,
      'ic-Editor-MenuButton__icon-text--sr': this.props.icon
    });
  },

  render() {
    var active = this.isActive();

    return (
      <button className={this.buttonClasses(active)} onClick={this.handleClick}>
        <i className={this.iconClasses(active)}></i>
        <span className={this.textClasses()}>{this.props.text}</span>
      </button>
    );
  }
};

module.exports = MenuButtonMixin;
