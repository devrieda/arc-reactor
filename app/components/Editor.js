/** @jsx React.DOM */

var React = require('react');
var EditorSection = require('./EditorSection');
var Guid = require('../modules/Guid');
require('./Editor.css');

var Editor = React.createClass({
  propTypes: {
    content: React.PropTypes.object,
    onChange: React.PropTypes.func
  },

  getDefaultProps: function() {
    return {
      content: { sections: [] }, 
      onChange: function() {}
    }
  },

  componentWillMount: function() {
    this.setState({content: this.props.content});
  },

  getElement: function() {
    return this.refs.editor.getDOMNode()
  },

  // handle changes
  onChange: function() {
  },
  onInput: function() {
  },
  onBlur: function() {
  },
  onPaste: function() {
  },
  onKeyUp: function() {
  },
  onKeyDown: function() {
  },

  render: function() {
    var sections = this.state.content.sections.map(function(sect, i) {
      sect.meta = sect.meta || {};
      if (i == 0) { sect.meta.first = true; }
      return <EditorSection key={sect.id} content={sect} />
    });

    return (
      <div className="ic-Editor" ref="editor"
           onInput={this.onInput}
           onBlur={this.onBlur}
           onPaste={this.onPaste}
           onKeyUp={this.onKeyUp}
           onKeyDown={this.onKeyDown}
           contentEditable="true">
        {sections}
      </div>
    )
  }
});

module.exports = Editor;
