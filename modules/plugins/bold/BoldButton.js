import React from 'react';
import MenuButton from '../../components/MenuButton';
import ToggleMarkup from '../../helpers/Manipulation/ToggleMarkup';
import SelectedContent from '../../helpers/SelectedContent';

const BoldButton = React.createClass({
  statics: {
    getName: () => "bold",
    isVisible: (content, selection) => {
      const selContent = new SelectedContent(selection, content);
      return !selContent.isHeader();
    }
  },

  propTypes: MenuButton.propTypes,

  getDefaultProps() {
    return {
      type: "strong",
      text: "Bold",
      icon: "fa-bold"
    };
  },

  handlePress() {
    const guids   = this.props.selection.guids();
    const offsets = this.props.selection.offsets();
    const position = this.props.selection.position();

    const result = this._toggleMarkup().execute(guids, offsets, { type: this.props.type });

    return { content: result.content, position: position };
  },

  _toggleMarkup() {
    return new ToggleMarkup(this.props.content);
  },

  render() {
    return (
      <MenuButton {...this.props} onPress={this.handlePress} />
    );
  }
});

export default BoldButton;
