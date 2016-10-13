import React from 'react';
import BarButton from '../../components/BarButton';
import InsertSection from './lib/InsertSection';

const SectionButton = React.createClass({
  statics: {
    getName: () => "section",
  },

  propTypes: BarButton.propTypes,

  getDefaultProps() {
    return {
      type: "section",
      text: "Section",
      icon: "fa-ellipsis-h"
    };
  },

  handlePress() {
    const guids   = this.props.selection.guids();
    const offsets = this.props.selection.offsets();
    const position = this.props.selection.position();

    const command = new InsertSection(this.props.content);
    const result = command.execute(guids, offsets);

    return { content: result.content, position: position };
  },

  render() {
    return (
      <BarButton {...this.props} onPress={this.handlePress} />
    );
  }
});

export default SectionButton;
