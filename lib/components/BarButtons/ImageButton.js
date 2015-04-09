var React = require('react/addons');
var BarButton = require('../../mixins/BarButton');

var History = require('../../modules/History');
var InsertImage = require('../../modules/Manipulation/InsertImage');

var ImageButton = React.createClass({
  mixins: [BarButton],

  getDefaultProps() {
    return {
      type: "image",
      text: "Image",
      icon: "fa-picture-o",
      hasValue: true
    };
  },

  handlePress(_e, value) {
    console.log('press');

    var guids   = this.props.selection.guids();
    var offsets = this.props.selection.offsets();
    var position = this.props.selection.position();

    var options = { type: this.props.type, value: value };
    var result = this._insertImage().execute(guids, offsets, options);

    // track content state and where cursor is
    History.getInstance().push({content: result.content, position: position});

    return result.content;
  },

  _insertImage() {
    return new InsertImage(this.props.content);
  }
});

module.exports = ImageButton;
