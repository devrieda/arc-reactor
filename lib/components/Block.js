var React = require('react/addons');
var PureRenderMixin = React.addons.PureRenderMixin;
var PreventDragMixin = require('../mixins/PreventDrag');
var Immutable = require('immutable');
var BlockFormatter = require('../modules/BlockFormatter');
var cx = require("classnames");

var { string, instanceOf } = React.PropTypes;

var Block = React.createClass({
  mixins: [PureRenderMixin, PreventDragMixin],

  propTypes: {
    id: string,
    type: string,
    text: string,
    meta: instanceOf(Immutable.Map),
    markups: instanceOf(Immutable.Map),
    blocks: instanceOf(Immutable.List)
  },

  getDefaultProps() {
    return {
      id: '',
      type: 'p',
      text: '',
      meta: Immutable.Map(),
      markups: Immutable.Map(),
      blocks: Immutable.List()
    };
  },

  // replace non-breaking spaces with unicode nbsp
  rawText() {
    return this.props.text.replace(/^ | $/g, "\u00a0");
  },

  formattedText() {
    if (this.isEmpty()) { return '<br />'; }

    var text = this.rawText();
    if (!text) { return text; }

    var formatter = new BlockFormatter(text);
    return formatter.applyMarkup(this.props.markups);
  },

  // add meta info to custom attributes
  buildAttr() {
    var attr = {
      'className': this.blockClasses(),
      'onDragStart': this.preventDrag,
      'name': this.props.id,
      'data-block': true
    };

    var meta = this.props.meta || Immutable.Map;
    meta.forEach( (val, prop) => { attr[`data-${prop}`] = val; });

    return attr;
  },

  isEmpty() {
    var text   = this.props.text   || "";
    var blocks = this.props.blocks || Immutable.List();
    return text.length === 0 && blocks.size === 0;
  },

  // add class modifiers
  blockClasses() {
    var type = this.props.type;
    var classes = {
      'ic-Editor-Block': true,
      'ic-Editor-Block--empty': this.isEmpty(),
      'ic-Editor-Block--header': ['h2', 'h3', 'h4'].indexOf(type) !== -1,
      'ic-Editor-Block--list': ['ol', 'ul'].indexOf(type) !== -1,
      'ic-Editor-Block--first': this.props.meta.get('first'),
    };
    classes[`ic-Editor-Block--${this.props.id}`] = true;
    classes[`ic-Editor-Block--${type}`] = true;

    return cx(classes);
  },

  // build the block list-items for lists
  children() {
    var type = this.props.type;
    if (type === "ul" || type === "ol") {
      var blocks = this.props.blocks || Immutable.List();
      return blocks.map( (block) => {
        return (
          <Block
            key={block.get('id')}
            id={block.get('id')}
            type={block.get('type')}
            text={block.get('text')}
            meta={block.get('meta')}
            markups={block.get('markups')}
            blocks={block.get('blocks')}
          />
        );
      });
    } else {
      return this.rawText();
    }
  },

  render() {
    var attr = this.buildAttr();
    var type = this.props.type;
    var markups = this.props.markups || Immutable.Map();

    if (markups.size > 0 || this.isEmpty()) {
      attr.dangerouslySetInnerHTML = { __html: this.formattedText() };
      return React.createElement(type, attr);

    } else {
      return React.createElement(type, attr, this.children());
    }
  }
});

module.exports = Block;
