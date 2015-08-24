var React = require('react/addons');
var PureRenderMixin = React.addons.PureRenderMixin;
var Immutable = require('immutable');
var Figure = require('./Figure');
var cx = require('classnames');

var { string, object, instanceOf } = React.PropTypes;

var Image = React.createClass({
  mixins: [PureRenderMixin],

  statics: {
    matches: (block) => {
      return block.get('type') === 'image';
    }
  },

  propTypes: {
    id: string,
    type: string,
    text: string,
    meta: instanceOf(Immutable.Map),
    data: instanceOf(Immutable.Map),
    guids: object,
    offsets: object,
  },

  getDefaultProps() {
    return {
      type: 'figure',
      text: '',
      meta: Immutable.Map(),
      data: Immutable.Map(),
      guids: {},
      offsets: {}
    };
  },

  getAspectRatio() {
    var height = this.props.meta.get('height');
    var width  = this.props.meta.get('width');
    return height / width;
  },

  getDimensions() {
    var height = this.props.meta.get('height');
    var width  = this.props.meta.get('width');
    var maxWidth  = width;
    var maxHeight = height;

    // scale down
    if (width > 700) {
      maxWidth  = 700;
      maxHeight = height * (700 / width);
    }
    return { maxWidth: maxWidth, maxHeight: maxHeight };
  },

  render() {
    var selected = this.props.guids.anchor === this.props.id;
    var classNames = cx('arc-Editor-Figure__image', {
      'arc-Editor-Figure__image--selected': selected,
    });

    return (
      <Figure id={this.props.id} text={this.props.text} ref="figure">
        <div className="arc-Editor-Figure__placeholder"
          style={this.getDimensions()}
        >
          <div style={{ paddingBottom: this.getAspectRatio() * 100 + '%' }}></div>
          <img className={classNames} src={this.props.meta.get('src')} />
        </div>
      </Figure>
    );
  }
});

module.exports = Image;
