var React = require('react/addons');
var BlockFormatter = require('../modules/BlockFormatter');
var cx = require("classnames");

require('../stylesheets/Block.scss');

var { string, shape, array } = React.PropTypes;

var Block = React.createClass({
  propTypes: {
    type: string,
    text: string,
    meta: shape({
      align: string
    }),
    markups: shape({
      em: array,
      strong: array,
      a: array
    }),
    blocks: array
  },

  getDefaultProps() {
    return {
      type: "p",
      text: "",
      meta: {},
      blocks: [],
      markups: {}
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
    var formatted = formatter.applyMarkup(this.props.markups);

    return formatted;
  },

  // add meta info to custom attributes
  buildAttr() {
    var attr = {
      "className": this.blockClasses(),
      "name": this.props.id
    };
    var meta = this.props.meta || {};
    for (var property in meta) {
      if (meta.hasOwnProperty(property)) {
        attr[`data-${property}`] = meta[property];
      }
    }
    return attr;
  },

  isEmpty() {
    var text   = this.props.text   || "";
    var blocks = this.props.blocks || [];
    return text.length == 0 && blocks.length == 0;
  },

  // add class modifiers
  blockClasses() {
    var type = this.props.type;
    var classes = {
      'ic-Editor-Block': true,
      'ic-Editor-Block--empty': this.isEmpty(),
      'ic-Editor-Block--header': ['h2', 'h3', 'h4'].indexOf(type) != -1,
      'ic-Editor-Block--list': ['ol', 'ul'].indexOf(type) != -1,
      'ic-Editor-Block--first': this.props.first,
    };
    classes[`ic-Editor-Block--${this.props.id}`] = true;
    classes[`ic-Editor-Block--${type}`] = true;

    return cx(classes);
  },

  // build the block list-items for lists
  children() {
    var type = this.props.type;
    if (type == "ul" || type == "ol") {
      var blocks = this.props.blocks || [];
      return blocks.map( (block) => {
        return <Block key={block.id} {...block} />;
      });
    } else {
      return this.rawText();
    }
  },

  render() {
    var attr = this.buildAttr();
    var type = this.props.type;
    var markups = this.props.markups || {};

    if (Object.keys(markups).length > 0 || this.isEmpty()) {
      attr.dangerouslySetInnerHTML = { __html: this.formattedText() };
      return React.createElement(type, attr);

    } else {
      return React.createElement(type, attr, this.children());
    }
  }
});

module.exports = Block;
