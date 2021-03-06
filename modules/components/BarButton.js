import React from 'react';
import Immutable from 'immutable';
import cx from 'classnames';
import History from '../helpers/History';
import EditorStore from '../stores/EditorStore';

const { string, bool, object, instanceOf, func } = React.PropTypes;

const BarButton = React.createClass({
  propTypes: {
    type: string,
    text: string,
    icon: string,
    hasValue: bool,
    content: instanceOf(Immutable.Map),
    selection: object,
    onActivate: func,
    onPress: func,
    handleSetValue: func,
  },

  getDefaultProps() {
    return {
      content: Immutable.Map(),
      selection: {},
      onActivate: Function.prototype,
      handleSetValue: Function.prototype,
    };
  },

  handleClick() {
    // if the button needs a value and we don't have it yet
    if (this.props.hasValue) {
      this.props.handleSetValue(this);

    } else {
      const { content, position } = this.props.onPress();

      // let the Bar know we did something (to close the menu)
      this.props.onActivate();

      // track content state and where cursor is
      History.getInstance().push({ content: content, position: position });

      EditorStore.set({content: content})
    }
  },

  buttonClasses() {
    let classes = {};
    classes[`arc-Editor-BarButton--${this.props.type}`] = true;
    return cx('arc-Editor-BarButton', classes);
  },

  iconClasses() {
    let iconClass = {};
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

export default BarButton;
