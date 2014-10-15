/** @jsx React.DOM */

var React = require('react');
var addons = require('react/addons');
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

  htmlTag: function() {
    var tag = this.props.content.type;
    if (tag == 'pullquote') { tag = 'blockquote'; }
    return tag;
  },

  htmlContent: function() {
    var type = this.props.content.type;
    if (type == "ul" || type == "ol") {
      return this.props.content.blocks.map(function(li) {
        return <EditorBlock key={li.id} content={li} />
      });
    } else {
      return this.buildText();
    }
  },
  buildText: function() {
    var origText = this.props.content.text;
    var inlines  = this.props.content.inlines || [];

    var a  = inlines.filter(function(inline) { inline.type == "a"; });
    var st = inlines.filter(function(inline) { inline.type == "strong"; });
    var em = inlines.filter(function(inline) { inline.type == "em"; });

    return this.props.content.text;
  },

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

