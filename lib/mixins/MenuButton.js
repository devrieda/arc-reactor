var React = require('react/addons');
var Immutable = require('immutable');
var cx = require("classnames");
var SelectedContent = require('../modules/SelectedContent');
var EditorStore = require('../stores/EditorStore');

require('../stylesheets/MenuButton.scss');

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
    if (this.props.hasValue && !value) {
      this.props.handleSetValue(this);

    } else {
      var content = this.handlePress(e, value);
      EditorStore.set({content: content});
    }
  },

  isActive() {
    var selContent = new SelectedContent(
      this.props.selection, this.props.content
    );
    return selContent.isActive(this.props.type);
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
      'ic-Editor-MenuButton__icon': true,
      'ic-Editor-MenuButton__icon--active': active,
      'fa': true
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
