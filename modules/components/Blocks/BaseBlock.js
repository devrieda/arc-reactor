var React = require('react/addons');
var PureRenderMixin = React.addons.PureRenderMixin;
var Immutable = require('immutable');
var BlockFormatter = require('../../helpers/BlockFormatter');
var EditorStore = require('../../stores/EditorStore');
var cx = require('classnames');

var { string, instanceOf } = React.PropTypes;

var BaseBlock = React.createClass({
  mixins: [PureRenderMixin],

  propTypes: {
    id: string,
    type: string,
    text: string,
    meta: instanceOf(Immutable.Map),
    data: instanceOf(Immutable.Map),
    markups: instanceOf(Immutable.Map),
    blocks: instanceOf(Immutable.List),
  },

  getDefaultProps() {
    return {
      id: '',
      type: 'p',
      tag: 'p',
      text: '',
      meta: Immutable.Map(),
      data: Immutable.Map(),
      markups: Immutable.Map(),
      blocks: Immutable.List(),
    };
  },

  handleHover(e) {
    var node = e.target;
    while (node.tagName.toLowerCase() !== 'a' &&
           !node.getAttribute('data-block')) {
      node = node.parentNode;
    }
    if (node && node.getAttribute('data-block')) return;

    this.linkActive = e.type === 'mouseover';
    this.timeout = setTimeout( () => {
      this._handleHoverLink(node, this.linkActive);
    }, 250);
  },

  _handleHoverLink(node, active) {
    var state = EditorStore.get().linkState;
    if (state && state.hovered) return;

    var linkState = {
      active: active,
      value: node.getAttribute("href"),
      bounds: node.getBoundingClientRect(),
    };
    EditorStore.set({ linkState: linkState });
  },

  _formattedText() {
    var formatter = new BlockFormatter(this._rawText());
    return formatter.applyMarkup(this.props.markups);
  },

  // replace non-breaking spaces with unicode nbsp
  _rawText() {
    return this.props.text.replace(/^ | $/g, "\u00a0");
  },

  _isEmpty() {
    var text   = this.props.text   || "";
    var blocks = this.props.blocks || Immutable.List();
    return text.length === 0 && blocks.size === 0;
  },

  // build the block list-items for lists
  _getChildBlocks() {
    var type = this.props.type;
    if (type === "ul" || type === "ol") {
      var blocks = this.props.blocks || Immutable.List();
      return blocks.map( (block) => {
        return (
          <BaseBlock
            key={block.get('id')}
            id={block.get('id')}
            type={block.get('type')}
            text={block.get('text')}
            meta={block.get('meta')}
            data={block.get('data')}
            markups={block.get('markups')}
            blocks={block.get('blocks')}
          />
        );
      });
    } else {
      return this._rawText();
    }
  },

  _buildClassNames() {
    var type = this.props.type;
    var classNames = {
      'arc-Editor-Block': true,
      'arc-Editor-Block--empty': this._isEmpty(),
      'arc-Editor-Block--header': ['h2', 'h3', 'h4'].indexOf(type) !== -1,
      'arc-Editor-Block--list': ['ol', 'ul'].indexOf(type) !== -1,
      'arc-Editor-Block--first': this.props.meta.get('first'),
    };
    classNames[`arc-Editor-Block--${this.props.id}`] = true;
    classNames[`arc-Editor-Block--${type}`] = true;

    return cx(classNames);
  },

  // add meta info to custom attributes
  _buildAttr() {
    var attr = {
      'className': this._buildClassNames(),
      'onDragStart': (e) => { e.preventDefault(); },
      'name': this.props.id,
      'data-block': true
    };

    var data = this.props.data || Immutable.Map();
    data.forEach( (val, prop) => { attr[`data-${prop}`] = val; });
    attr.onMouseOver = this.handleHover;
    attr.onMouseOut  = this.handleHover;

    return attr;
  },

  render() {
    var attr = this._buildAttr();
    var type = this.props.type;
    var markups = this.props.markups || Immutable.Map();

    if (this._isEmpty()) {
      attr.dangerouslySetInnerHTML = { __html: '<br />' };
      return React.createElement(type, attr);

    } else if (markups.size > 0) {
      attr.dangerouslySetInnerHTML = { __html: this._formattedText() };
      return React.createElement(type, attr);

    } else {
      return React.createElement(type, attr, this._getChildBlocks());
    }
  }
});

module.exports = BaseBlock;
