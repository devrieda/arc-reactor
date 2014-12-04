var React = require('react/addons');

var BlockFormatter = require('../modules/BlockFormatter');

require('../stylesheets/Block.scss');

var Block = React.createClass({
  propTypes: {
    content: React.PropTypes.object
  },

  getDefaultProps() {
    return {
      content: { type: "p", text: "", meta: {}, blocks: [], markups: {} }
    }
  },

  formattedText() {
    if (this.isEmpty()) { return '<br />'; }

    var text = this.props.content.text;
    if (!text) { return text; }

    var formatter = new BlockFormatter(text);
    var formatted = formatter.applyMarkup(this.props.content.markups);

    return formatted;
  },

  // add meta info to custom attributes
  buildAttr() {
    var attr = {
      "className": this.blockClasses(),
      "name": this.props.content.id
    }
    var meta = this.props.content.meta || {};
    for (var property in meta) {
      if (meta.hasOwnProperty(property)) {
        attr[`data-${property}`] = meta[property];
      }
    }
    return attr;
  },

  isEmpty() {
    var text   = this.props.content.text   || "";
    var blocks = this.props.content.blocks || [];
    return text.length == 0 && blocks.length == 0
  },

  // add class modifiers
  blockClasses() {
    var type = this.props.content.type;
    var classes = {
      'ic-Editor-Block': true,
      'ic-Editor-Block--empty': this.isEmpty(),
      'ic-Editor-Block--header': ['h2', 'h3', 'h4'].indexOf(type) != -1,
      'ic-Editor-Block--list': ['ol', 'ul'].indexOf(type) != -1,
      'ic-Editor-Block--first': this.props.first,
    };
    classes[`ic-Editor-Block--${this.props.content.id}`] = true;
    classes[`ic-Editor-Block--${type}`] = true;

    return React.addons.classSet(classes)
  },

  // build the block list-items for lists
  children() {
    var type = this.props.content.type;
    if (type == "ul" || type == "ol") {
      var blocks = this.props.content.blocks || [];
      return blocks.map( (block) => {
        return <Block key={block.id} content={block} />
      });
    } else {
      return this.props.content.text;
    }
  },

  render() {
    var attr = this.buildAttr();
    var type = this.props.content.type;
    var markups = this.props.content.markups || {};

    if (Object.keys(markups).length > 0 || this.isEmpty()) {
      attr.dangerouslySetInnerHTML = { __html: this.formattedText() };
      return React.createElement(type, attr);

    } else {
      return React.createElement(type, attr, this.children()) ;
    }
  }
});

module.exports = Block;

