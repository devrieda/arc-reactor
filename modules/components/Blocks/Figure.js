var React = require('react/addons');
var PureRenderMixin = React.addons.PureRenderMixin;
var cx = require('classnames');
var FigCaption = require('./FigCaption');

var { bool, string } = React.PropTypes;

var Figure = React.createClass({
  mixins: [PureRenderMixin],

  propTypes: {
    id: string,
    text: string,
    selected: bool
  },

  getDefaultProps() {
    return {
      text: '',
      selected: false
    };
  },

  preventDrag(e) {
    e.preventDefault();
  },

  render() {
    var classNames = cx('arc-Editor-Figure', {
      'arc-Editor-Figure--outset-left': false,
      'arc-Editor-Figure--inset-left': false
    });

    return (
      <figure
        name={this.props.id}
        data-figure="true"
        data-block="true"
        contentEditable="false"
        onDragStart={this.preventDrag}
        className={classNames}
      >
        <div data-figure="true" className="arc-Editor-Figure__wrapper" data-blockid={this.props.id}>
          {this.props.children}
        </div>

        {false && <div className="arc-Editor-Figure__focus" children=" " />}
        {false && <FigCaption text={this.props.text} />}
      </figure>
    );
  }
});

module.exports = Figure;
