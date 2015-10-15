import React from 'react/addons';
import Immutable from 'immutable';
import Figure from '../shared/Figure';
import cx from 'classnames';

const PureRenderMixin = React.addons.PureRenderMixin;
const { string, object, instanceOf } = React.PropTypes;

const Image = React.createClass({
  mixins: [PureRenderMixin],

  statics: {
    getName: () => "image",
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
    const height = this.props.meta.get('height');
    const width  = this.props.meta.get('width');
    return height / width;
  },

  getDimensions() {
    const height = this.props.meta.get('height');
    const width  = this.props.meta.get('width');
    let maxWidth  = width;
    let maxHeight = height;

    // scale down
    if (width > 700) {
      maxWidth  = 700;
      maxHeight = height * (700 / width);
    }
    return { maxWidth: maxWidth, maxHeight: maxHeight };
  },

  render() {
    const selected = this.props.guids.anchor === this.props.id;
    const classNames = cx('arc-Editor-Figure__image', {
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

export default Image;
