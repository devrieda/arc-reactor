import React from 'react/addons';
import BarButton from '../BarButton';
import InsertImage from '../../helpers/Manipulation/InsertImage';

const ImageButton = React.createClass({
  statics: {
    getName: () => "image",
  },

  propTypes: BarButton.propTypes,

  getDefaultProps() {
    return {
      type: "image",
      text: "Image",
      icon: "fa-picture-o",
      hasValue: true
    };
  },

  handlePress(value) {
    const guids   = this.props.selection.guids();
    const offsets = this.props.selection.offsets();
    const position = this.props.selection.position();

    const options = { type: this.props.type, value: value };
    const result = this._insertFigure().execute(guids, offsets, options);

    return { content: result.content, position: position };
  },

  _insertFigure() {
    return new InsertImage(this.props.content);
  },

  render() {
    return (
      <BarButton {...this.props} onPress={this.handlePress} />
    );
  }
});

export default ImageButton;
