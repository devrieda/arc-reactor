var React = require('react/addons');
var BarButton = require('../BarButton');

var History = require('../../helpers/History');
var InsertImage = require('../../helpers/Manipulation/InsertImage');

var ImageButton = React.createClass({
  getDefaultProps() {
    return {
      type: "image",
      text: "Image",
      icon: "fa-picture-o",
      hasValue: true
    };
  },

  handlePress(value) {
    var guids   = this.props.selection.guids();
    var offsets = this.props.selection.offsets();
    var position = this.props.selection.position();

    var options = { type: this.props.type, value: value };
    var result = this._insertFigure().execute(guids, offsets, options);

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

module.exports = ImageButton;
