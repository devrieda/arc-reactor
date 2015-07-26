var React = require('react/addons');
var PureRenderMixin = React.addons.PureRenderMixin;
var Immutable = require('immutable');
var Figure = require('./Figure');
var cx = require('classnames');

var { bool, string, instanceOf } = React.PropTypes;

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
    selected: bool
  },

  getDefaultProps() {
    return {
      type: 'figure',
      text: '',
      meta: Immutable.Map(),
      data: Immutable.Map(),
      selected: false
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
    var classNames = cx('ic-Editor-Figure__image', {
      'ic-Editor-Figure__image--selected': this.props.selected,
    });

    return (
      <Figure id={this.props.id} text={this.props.text} ref="figure">
        <div className="ic-Editor-Figure__placeholder"
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
