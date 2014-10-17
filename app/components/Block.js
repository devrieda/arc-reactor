/** @jsx React.DOM */

var React = require('react/addons');
var Formatter = require('../modules/Formatter');
require('../stylesheets/Block.css');

var Block = React.createClass({
  propTypes: {
    content: React.PropTypes.object
  },

  getDefaultProps: function() {
    return {
      content: { type: "p", text: "", meta: {}, blocks: [], inlines: [] }
    }
  },
  getInitialState: function() {
    return { selected: false }
  },

  formattedText: function() {
    var text    = this.props.content.text;
    var inlines = this.props.content.inlines || [];
    if (!text) { return text; }

    var formatter = new Formatter(text);
    var formatted = formatter.applyMarkup(inlines);

    return formatted;
  },

  // add meta info to custom attributes
  buildAttr: function() {
    var attr = {
      "className": this.blockClasses(),
      "name": this.props.content.id
    }
    var meta = this.props.content.meta || {};
    for (var property in meta) {
      if (meta.hasOwnProperty(property)) {
        attr["data-" + property] = meta[property];
      }
    }
    return attr;
  },

  // add class modifiers
  blockClasses: function() {
    var type = this.props.content.type;
    var classes = {
      'ic-Editor-Block': true,
      'ic-Editor-Block--list': type == 'ol' || type == 'ul',
      'ic-Editor-Block--first': this.props.first,
    };
    classes['ic-Editor-Block--' + type] = true;

    return React.addons.classSet(classes)
  },

  // build the block list-items for lists
  children: function() {
    var type = this.props.content.type;
    if (type == "ul" || type == "ol") {
      var blocks = this.props.content.blocks || [];
      return blocks.map(function(block) {
        return <Block key={block.id} content={block} />
      });
    } else {
      return this.props.content.text;
    }
  },

  render: function() {
    var attr = this.buildAttr();
    var node = React.DOM[this.props.content.type];
    var inlines = this.props.content.inlines || [];

    if (inlines.length > 0) {
      attr.dangerouslySetInnerHTML = { __html: this.formattedText() }
      return node(attr)

    } else {
      return node(attr, this.children())
    }
  }
});

module.exports = Block;

