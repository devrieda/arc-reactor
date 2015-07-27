var React = require('react/addons');
var Immutable = require('immutable');
var cx = require("classnames");
var SelectedContent = require('../helpers/SelectedContent');
var EditorStore = require('../stores/EditorStore');

var { string, bool, object, instanceOf } = React.PropTypes;

var MenuButton = React.createClass({
  propTypes: {
    type: string,
    text: string,
    icon: string,
    hasValue: bool,
    content: instanceOf(Immutable.Map),
    selection: object,
  },

  getDefaultProps() {
    return {
      content: Immutable.Map(),
      selection: {},
    };
  },

  handleClick() {
    // if the button needs a value and we don't have it yet
    if (this.props.hasValue && !this.isActive()) {
      this.props.onSetValue(this);

    // we have a value to set
    } else {
      var content = this.props.onPress();
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
      'ic-Editor-MenuButton--active': active,
    };
    classes[`ic-Editor-MenuButton--${this.props.type}`] = true;
    return cx('ic-Editor-MenuButton', classes);
  },

  iconClasses(active) {
    var iconClass = {
      'ic-Editor-MenuButton__icon--active': active,
    };
    iconClass[this.props.icon] = true;
    return cx('ic-Editor-MenuButton__icon fa', iconClass);
  },

  textClasses() {
    return cx('ic-Editor-MenuButton__icon-text', {
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
});

module.exports = MenuButton;
