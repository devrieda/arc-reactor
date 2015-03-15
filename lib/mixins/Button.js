var React = require('react/addons');
var cx = require("classnames");
var SelectedContent = require('../modules/SelectedContent');
var ContentManager = require('../modules/ContentManager');
var EditorStore = require('../stores/EditorStore');

require('../stylesheets/Button.scss');

var { string, bool, shape, array, object, func } = React.PropTypes;

var ButtonMixin = {
  propTypes: {
    type: string,
    text: string,
    icon: string,
    hasValue: bool,
    content: shape({ sections: array }),
    selection: object,
    handleSetValue: func
  },

  getDefaultProps() {
    return {
      content: {},
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
      'ic-Editor-Button': true,
      'ic-Editor-Button--active': active,
    };
    classes[`ic-Editor-Button--${this.props.type}`] = true;
    return cx(classes);
  },

  iconClasses(active) {
    var iconClass = {
      'ic-Editor-Button__icon': true,
      'ic-Editor-Button__icon--active': active,
      'fa': true
    }
    iconClass[this.props.icon] = true;
    return cx(iconClass);
  },

  textClasses() {
    return cx({
      'ic-Editor-Button__icon-text': true,
      'ic-Editor-Button__icon-text--sr': this.props.icon
    });
  },

  render() {
    var active = this.isActive();

    return (
      <button className={this.buttonClasses(active)} onClick={this.handleClick}>
        <i className={this.iconClasses(active)}></i>
        <span className={this.textClasses()}>{this.props.text}</span>
      </button>
    )
  }
};

module.exports = ButtonMixin;
