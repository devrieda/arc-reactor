import React from 'react';
import ReactDOM from 'react-dom';
import Immutable from 'immutable';
import Figure from '../shared/Figure';
import cx from 'classnames';

const PureRenderMixin = require('react-addons-pure-render-mixin');
const { string, object, instanceOf } = React.PropTypes;

const YouTube = React.createClass({
  mixins: [PureRenderMixin],

  statics: {
    getName: () => "youtube",
    matches: (block) => {
      return block.get('type') === 'youtube';
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

  getInitialState() {
    return {
      width: 700
    };
  },

  componentDidMount() {
    window.addEventListener("resize", this.resizeVideo);
    this.resizeVideo();
  },

  componentWillUnmount() {
    window.removeEventListener("resize", this.resizeVideo);
  },

  preventDrag(e) {
    e.preventDefault();
  },

  resizeVideo() {
    const width = ReactDOM.findDOMNode(this.refs.figure).clientWidth;
    this.setState({ width });
  },

  render() {
    const selected = this.props.guids.anchor === this.props.id;
    const classNames = cx({
      'arc-Editor-Figure__iframe': true,
      'arc-Editor-Figure__iframe--selected': selected,
    });

    return (
      <Figure id={this.props.id} text={this.props.text} ref="figure">
        <iframe ref="iframe"
          className={classNames}
          width={this.state.width}
          height={Math.round(this.state.width / 1.78)}
          src={this.props.meta.get('src')}
          frameBorder="0">
        </iframe>
      </Figure>
    );
  }
});

export default YouTube;
