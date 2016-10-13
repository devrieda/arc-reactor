import React from 'react';
import Immutable from 'immutable';
import cx from 'classnames';
import History from '../helpers/History';
import SelectedContent from '../helpers/SelectedContent';
import EditorStore from '../stores/EditorStore';

const { string, bool, object, instanceOf, func } = React.PropTypes;

const MenuButton = React.createClass({
  propTypes: {
    type: string,
    text: string,
    icon: string,
    hasValue: bool,
    content: instanceOf(Immutable.Map),
    selection: object,
    onSetValue: func,
    onPress: func,
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
      const { content, position } = this.props.onPress();

      // track content state and where cursor is
      History.getInstance().push({ content: content, position: position });

      EditorStore.set({content: content});
    }
  },

  isActive() {
    const selContent = new SelectedContent(
      this.props.selection, this.props.content
    );
    return selContent.isActive(this.props.type, this.props.hasValue);
  },

  buttonClasses(active) {
    let classes = {
      'arc-Editor-MenuButton--active': active,
    };
    classes[`arc-Editor-MenuButton--${this.props.type}`] = true;
    return cx('arc-Editor-MenuButton', classes);
  },

  iconClasses(active) {
    let iconClass = {
      'arc-Editor-MenuButton__icon--active': active,
    };
    iconClass[this.props.icon] = true;
    return cx('arc-Editor-MenuButton__icon fa', iconClass);
  },

  textClasses() {
    return cx('arc-Editor-MenuButton__icon-text', {
      'arc-Editor-MenuButton__icon-text--sr': this.props.icon
    });
  },

  render() {
    const active = this.isActive();

    return (
      <button className={this.buttonClasses(active)} onClick={this.handleClick}>
        <i className={this.iconClasses(active)}></i>
        <span className={this.textClasses()}>{this.props.text}</span>
      </button>
    );
  }
});

export default MenuButton;
