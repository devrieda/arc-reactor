var React = require('react/addons');
var Immutable = require('immutable');
var cx = require("classnames");
var EditorStore = require('../stores/EditorStore');

require('../stylesheets/BarButton.scss');

var { string, bool, object, func, instanceOf } = React.PropTypes;

var BarButtonMixin = {
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
      var content = this.handlePress(value);
      EditorStore.set({content: content});
    }
  },

  buttonClasses() {
    var classes = {
      'ic-Editor-BarButton': true,
    };
    classes[`ic-Editor-BarButton--${this.props.type}`] = true;
    return cx(classes);
  },

  iconClasses() {
    var iconClass = {
      'ic-Editor-BarButton__icon fa': true,
    };
    iconClass[this.props.icon] = true;
    return cx(iconClass);
  },

  render() {
    return (
      <button className={this.buttonClasses()} onClick={this.handleClick}>
        <i className={this.iconClasses()}></i>
        <span className="ic-Editor-BarButton__icon-text">{this.props.text}</span>
      </button>
    );
  }
};

module.exports = BarButtonMixin;
