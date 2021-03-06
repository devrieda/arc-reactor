import React from 'react';
import MenuButton from '../../components/MenuButton';
import ToggleCenter from './lib/ToggleCenter';

const CenterButton = React.createClass({
  statics: {
    getName: () => "center",
    isVisible: () => true
  },

  propTypes: MenuButton.propTypes,

  getDefaultProps() {
    return {
      type: "center",
      text: "Center",
      icon: "fa-align-center"
    };
  },

  handlePress() {
    const guids   = this.props.selection.guids();
    const offsets = this.props.selection.offsets();
    const position = this.props.selection.position();

    const result = this._toggleCenter().execute(guids, offsets);

    return { content: result.content, position: position };
  },

  _toggleCenter() {
    return new ToggleCenter(this.props.content);
  },

  render() {
    return (
      <MenuButton {...this.props} onPress={this.handlePress} />
    );
  }
});

export default CenterButton;
