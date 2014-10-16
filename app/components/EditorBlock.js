/** @jsx React.DOM */

var React = require('react/addons');
var Formatter = require('../modules/Formatter');
require('./EditorBlock.css');

var EditorBlock = React.createClass({
  propTypes: {
    content: React.PropTypes.object
  },

  getDefaultProps: function() {
    return {
      content: { type: "p", text: "", meta: {}, blocks: [], inlines: [] }
    }
  },

  // not all block types match 1-1 with html
  htmlTag: function() {
    var tag = this.props.content.type;
    if (tag == 'pullquote') { tag = 'blockquote'; }
    return tag;
  },

  // build the block list-items for lists
  htmlContent: function() {
    var type = this.props.content.type;
    if (type == "ul" || type == "ol") {
      var blocks = this.props.content.blocks || [];
      return blocks.map(function(block) {
        return <EditorBlock key={block.id} content={block} />
      });
    } else {
      return this.buildText();
    }
  },

  // add inline markup
  buildText: function() {
    var text    = this.props.content.text;
    var inlines = this.props.content.inlines || [];
    if (!text) { return text; }

    var formatter = new Formatter(text);
    return formatter.applyMarkup(inlines);
  },

  // add class modifiers
  buildClassNames: function() {
    var type = this.props.content.type;
    var classes = {
      'ic-EditorBlock': true,
      'ic-EditorBlock--list': type == 'ol' || type == 'ul',
      'ic-EditorBlock--first': this.props.first,
    };
    classes['ic-EditorBlock--' + type] = true;

    return React.addons.classSet(classes)
  },

  // add meta info to custom attributes
  buildAttr: function() {
    var attr = {
      "className": this.buildClassNames()
    }
    var meta = this.props.content.meta || {};
    for (var property in meta) {
      if (meta.hasOwnProperty(property)) {
        attr["data-" + property] = meta[property];
      }
    }
    return attr;
  },

  render: function() {
    return React.DOM[this.htmlTag()](this.buildAttr(), this.htmlContent())
  }
});

module.exports = EditorBlock;

