/** @jsx React.DOM */

var React = require('react');
var addons = require('react/addons');
var k = function(){};
require('./EditorBlock.css');

var EditorBlock = React.createClass({
  propTypes: {
    content: React.PropTypes.object,
    onChange: React.PropTypes.func
  },

  getDefaultProps: function() {
    return {
      content: {
        type: "p",
        text: "",
        meta: {},
        blocks: [],
        inlines: []
      },
      onChange: k
    }
  },

  blockChanged: function(json) {
    // handle when block changes
  },

  componentWillMount: function() {
    this.setState({content: this.props.content});
  },

  htmlTag: function() {
    var tag = this.state.content.type;
    if (tag == 'pullquote') { tag = 'blockquote'; }
    return tag;
  },

  htmlContent: function() {
    var type = this.state.content.type;
    if (type == "ul" || type == "ol") {
      return this.state.content.blocks.map(function(li) {
        return <EditorBlock data-id={li.id} key={li.id} content={li} />
      });
    } else {
      return this.buildText();
    }
  },
  buildText: function() {
    var origText = this.state.content.text;
    var inlines  = this.state.content.inlines || [];
    inlines.forEach(function(inline) {
      console.log(inline)
    });

    return this.state.content.text;
  },

  buildClassNames: function() {
    var type = this.state.content.type;
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
    var meta = this.state.content.meta || {};
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

