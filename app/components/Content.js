/** @jsx React.DOM */

var React = require('react');
var Section = require('./Section');
var Guid = require('../modules/Guid');
var Selection = require('../modules/Selection');

require('../stylesheets/Content.css');

var Content = React.createClass({
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
  getInitialState: function() {
    return {
      content: {},
      selection: {}
    }
  },

  componentWillMount: function() {
    this.setState({content: this.props.content});
  },

  getElement: function() {
    return this.refs.editor.getDOMNode()
  },


  insertBlock: function() {
  },
  removeBlock: function() {
  },
  updateBlock: function() {
  },
  insertSection: function() {
  },
  removeSection: function() {
  },
  updateSection: function() {
  },

  checkSelection: function() {
    setTimeout(function() {
      var sel = new Selection(document.getSelection())
      var attr = sel.attr();

      this.setState({selection: attr});
      this.props.onChange(this.state.content, attr);
    }.bind(this), 1);
  },

  // handle changes
  onChange: function(e) {
    // console.log('changed')
  },
  onBlur: function(e) {
    this.checkSelection();
    this.onChange();
  },
  onPaste: function(e) {
    // console.log('paste')
  },
  onKeyUp: function(e) {
    this.checkSelection();
    // - carriage return (enter, ctrl-m, etc.)
    //   13, ctrl+77,
    //
    // - delete (delete, backspace, etc.)
    //   8, 46
    //
    // - type-over (select-text-and-type)
    //
  },
  onMouseUp: function(e) {
    this.checkSelection();
  },

  render: function() {
    var sections = this.state.content.sections.map(function(sect, i) {
      sect.meta = sect.meta || {};
      if (i == 0) { sect.meta.first = true; }
      return <Section key={sect.id} content={sect} />
    });

    return (
      <div className="ic-Editor-Content" ref="editor"
           onInput={this.onChange}
           onBlur={this.onBlur}
           onPaste={this.onPaste}
           onKeyUp={this.onKeyUp}
           onMouseUp={this.onMouseUp}
           contentEditable="true">
        {sections}
      </div>
    )
  }
});

module.exports = Content;

