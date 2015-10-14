import React from 'react/addons';
import BarButton from '../BarButton';
import InsertSection from '../../helpers/Manipulation/InsertSection';

const SectionButton = React.createClass({
  propTypes: BarButton.propTypes,

  getDefaultProps() {
    return {
      type: "section",
      text: "Section",
      icon: "fa-ellipsis-h"
    };
  },

  handlePress(value) {
    const guids   = this.props.selection.guids();
    const offsets = this.props.selection.offsets();
    const position = this.props.selection.position();

    const result = this._insertSection().execute(guids, offsets);

    return { content: result.content, position: position };
  },

  _insertSection() {
    return new InsertSection(this.props.content);
  },

  render() {
    return (
      <BarButton {...this.props} onPress={this.handlePress} />
    );
  }
});

export default SectionButton;
