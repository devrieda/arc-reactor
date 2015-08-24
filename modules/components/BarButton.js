var React = require('react/addons');
var Immutable = require('immutable');
var cx = require("classnames");
var EditorStore = require('../stores/EditorStore');

var { string, bool, object, instanceOf } = React.PropTypes;

var BarButton = React.createClass({
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
    if (this.props.hasValue) {
      this.props.handleSetValue(this);

    } else {
      var content = this.handlePress();
      EditorStore.set({content: content});
    }
  },

  buttonClasses() {
    var classes = {};
    classes[`arc-Editor-BarButton--${this.props.type}`] = true;
    return cx('arc-Editor-BarButton', classes);
  },

  iconClasses() {
    var iconClass = {};
    iconClass[this.props.icon] = true;
    return cx('arc-Editor-BarButton__icon fa', iconClass);
  },

  render() {
    return (
      <button className={this.buttonClasses()} onClick={this.handleClick}>
        <i className={this.iconClasses()}></i>
        <span className="arc-Editor-BarButton__icon-text">{this.props.text}</span>
      </button>
    );
  }
});

module.exports = BarButton;
