var React = require('react/addons');
var BarButton = require('../BarButton');

var History = require('../../modules/History');
var InsertPhoto = require('../../modules/Manipulation/InsertPhoto');

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

    // track content state and where cursor is
    History.getInstance().push({content: result.content, position: position});

    return result.content;
  },

  _insertFigure() {
    return new InsertPhoto(this.props.content);
  },

  render() {
    return (
      <BarButton {...this.props} onPress={this.handlePress} />
    );
  }
});

module.exports = ImageButton;
